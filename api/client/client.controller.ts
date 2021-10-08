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
    throw error;
  }
};
