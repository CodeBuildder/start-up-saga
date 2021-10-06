import { userPostType } from "./client.schema";
import HttpError from "http-errors";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";


export const userOrderDetails = async (userOrderData: userPostType) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("userOrder");

        const newUserOrderData = {
            companyName: userOrderData.companyName,
            fromAddress: userOrderData.fromAddress,
            toAddress: userOrderData.toAddress,
            date: userOrderData.date,
            weight: userOrderData.weight,
            price: userOrderData.price,
        }

        const response = await DB.insertOne(newUserOrderData)
        if (!response) {
            throw HttpError(500, "Internal Server Error!");
        }

        return {
            response,
            success: true,
            message: 'Order Successfully placed!'
        }

    } catch (err) {
        throw err
    };

}