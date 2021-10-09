import { UserOrder } from "./client.schema";
import HttpError from "http-errors";
import { sendOrderConfirmationEmail } from '../emails/account'
import { Company, Admin } from "../admin/admin.schema";
import { User } from '../auth/auth.schema'
import mongoose from "mongoose";
export const userOrderDetails = async (
  userOrderData: any,
  id: mongoose.Schema.Types.ObjectId
) => {
  try {
    const findAdmin = await Admin.findOne({
      _id: userOrderData.adminId,
    });
    const findUser = await User.findOne({
      _id: id
    })
    const newUserOrderData = {
      adminId: findAdmin._id,
      userId: id,
      fromAddress: userOrderData.fromAddress,
      toAddress: userOrderData.toAddress,
      date: userOrderData.date,
      weight: userOrderData.weight,
      price: userOrderData.price,
      orderedOn: new Date(),
      paymentMode: userOrderData.paymentMode,
    };

    const email = await sendOrderConfirmationEmail(findUser.email, findUser.username, newUserOrderData.userId, newUserOrderData.fromAddress, newUserOrderData.toAddress)

    console.log(email)

    console.log(newUserOrderData);
    const data = new UserOrder(newUserOrderData);
    const response = await data.save();

    if (!response) {
      throw HttpError(500, "Internal Server Error!");
    }

    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrderDetails = async (id: mongoose.Schema.Types.ObjectId) => {
  try {
    const userOrders = await UserOrder.find({
      userId: id,
    }).populate("adminId");
    // .populate("userId");

    return userOrders;
  } catch (error) {
    console.log(error);
  }
};
export const closeOrder = async (orderId: mongoose.Schema.Types.ObjectId) => {
  try {
    const closeOrder = await UserOrder.updateOne(
      { _id: orderId },
      { transactionOver: true }
    );
    return closeOrder;
  } catch (error) {
    throw error;
  }
};
export const postRating = async (
  id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  adminId: mongoose.Schema.Types.ObjectId
) => {
  try {
    const checkOrderStatus = await UserOrder.findOne({
      _id: id,
      transactionOver: true,
    });
    const findOrder = await UserOrder.findOne({ _id: id, gaveRating: true });
    if (findOrder) {
      throw HttpError(400, "You cannot give rating");
    }
    if (!checkOrderStatus) {
      throw HttpError(400, "Order has not been processed fully");
    }
    const getAdmin = await Admin.findOne({ _id: adminId });
    const previousRating = getAdmin.rating;

    let newRating = (previousRating + rating) / 2;
    if (previousRating == 0) {
      newRating = getAdmin.rating;
    }
    const updateNewRating = await Admin.findByIdAndUpdate(
      { _id: adminId },
      { rating: newRating },
      { new: true }
    );
    const gaveRatingUpdate = await UserOrder.findByIdAndUpdate(
      { _id: id },
      { gaveRating: true },
      { new: true }
    );

    return updateNewRating;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
