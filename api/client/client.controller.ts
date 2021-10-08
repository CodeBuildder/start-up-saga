import { UserOrder } from "./client.schema";
import HttpError from "http-errors";
import { Company, Admin } from "../admin/admin.schema";
import mongoose from "mongoose";
export const userOrderDetails = async (
  userOrderData: any,
  id: mongoose.Schema.Types.ObjectId
) => {
  try {
    const findAdmin = await Admin.findOne({
      _id: userOrderData.adminId,
    });

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
export const postRating = async (
  id: mongoose.Schema.Types.ObjectId,
  rating: Number
) => {
  try {
    const checkOrderStatus = await UserOrder.findOne({
      _id: id,
      transactionOver: true,
    });
    const findOrder = await UserOrder.findOne({ gaveRating: true });
    if (findOrder) {
      throw HttpError(400, "You cannot give rating");
    }
    console.log(checkOrderStatus);
    if (!checkOrderStatus) {
      throw HttpError(400, "Order has not been processed fully");
    }
    const updateRating = await UserOrder.findByIdAndUpdate(
      { _id: id },
      { rating: rating, gaveRating: true },
      { new: true }
    );
    console.log(updateRating);
    return updateRating;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
