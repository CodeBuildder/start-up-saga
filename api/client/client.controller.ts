import { userPostType } from "./client.schema";
import HttpError from "http-errors";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";

export const userOrderDetails = async (
  userOrderData: userPostType,
  id: mongodb.ObjectID
) => {
  try {
    const client: mongodb.MongoClient = await getClient();
    const companyDB = client.db().collection("admin");
    const DB = client.db().collection("userOrder");
    const findCompany = await companyDB.findOne({
      companyName: userOrderData.companyName,
    });
    console.log(findCompany);
    const newUserOrderData = {
      companyId: findCompany._id,
      userId: id,
      fromAddress: userOrderData.fromAddress,
      toAddress: userOrderData.toAddress,
      date: userOrderData.date,
      weight: userOrderData.weight,
      price: userOrderData.price,
    };
    console.log(newUserOrderData);
    const response = await DB.insertOne(newUserOrderData);
    if (!response) {
      throw HttpError(500, "Internal Server Error!");
    }

    return response.ops[0];
  } catch (err) {
    throw err;
  }
};

export const findLocation = async (data: string) => {
  const client: mongodb.MongoClient = await getClient();
  const DB = client.db().collection("places");

  const findIt = await DB.find({
    city: { $regex: `^${data}`, $options: "i" },
  }).toArray();
  //    fromAddress: { $regex: regexFromAddress },
  //   toAddress: { $regex: regexToAddress },
  //   date: { $elemMatch: { $gte: data.date } },
  // console.log(findIt);
  return findIt;
};

export const getOrderDetails = async (id: mongodb.ObjectID) => {
  try {
    const client: mongodb.MongoClient = await getClient();
    const DB = client.db().collection("userOrder");

    const userOrders = await DB.find({ userId: id }).toArray();

    return userOrders;
  } catch (error) {
    throw error;
  }
};
