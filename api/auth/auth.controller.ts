import * as mongodb from "mongodb";
import { userType, userSchema } from "./auth.schema";
import { getClient } from "../db/db.connect";
import HttpError from "http-errors";
import bcrypt from 'bcryptjs';


export const registerUser = async (userData: userType) => {

    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("users");

        if (await DB.findOne({ name: userData.name })) {
            throw HttpError(409, "User already exists!")
        }

        const hashedPassword = await bcrypt.hash('test', 10)

        const newUserData = {
            name: userData.name,
            password: hashedPassword,
            email: userData.email,
            phone: userData.phone
        }



        console.log(newUserData)

        const response = await DB.insertOne(newUserData);


        if (!response) {
            throw HttpError(500, "Internal Server Error!")
        }

        return {
            success: true,
            _id: response.insertedId,
        }

    } catch (err) {
        throw err;
    }
}

