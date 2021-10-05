import * as mongodb from "mongodb";
import { userType, userSchema } from "./auth.schema";
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import { getClient } from "../db/db.connect";

export const registerUser = async (userData: userType) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("users");

        if (await DB.findOne({ name: userData.name })) {
            throw HttpError(409, "User already exists!");
        }
        const salt = await bcrypt.genSalt(12);
        console.log(userData.password);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUserData = {
            name: userData.name,
            password: hashedPassword,
            email: userData.email,
            phone: userData.phone,
        };

        console.log(newUserData);

        const response = await DB.insertOne(newUserData);

        if (!response) {
            throw HttpError(500, "Internal Server Error!");
        }

        return {
            success: true,
            _id: response.insertedId,
        };
    } catch (err) {
        throw err;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        console.log(email);

        const verifyUser = await client
            .db()
            .collection("users")
            .findOne({ email: email });

        if (!verifyUser) {
            throw HttpError(
                401,
                "Email does not exist, please create a new account!"
            );
        }
        console.log(password);
        console.log(verifyUser.password);
        const correctPassword = await bcrypt.compare(password, verifyUser.password);
        console.log(correctPassword);
        if (!correctPassword) {

            throw HttpError(401, "Password Incorrect, please try again.");
        }

        return {
            success: true,
            status: 201,
        };
    } catch (err) {
        throw err;
    }
};
