import * as mongodb from "mongodb";
import { adminType } from "./admin.schema";
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import { getClient } from "../db/db.connect";

export const registerAdmin = async (adminData: adminType) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("admin");

        if (await DB.findOne({ name: adminData.name })) {
            throw HttpError(409, "User already exists!");
        }
        const salt = await bcrypt.genSalt(12);
        console.log(adminData.password);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);

        const newAdminData = {
            name: adminData.name,
            password: hashedPassword,
            email: adminData.email,
            phone: adminData.phone,
            address: adminData.address
        };

        console.log(newAdminData);

        const response = await DB.insertOne(newAdminData);

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

export const loginAdmin = async (email: string, password: string) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        console.log(email);

        const verifyAdmin = await client
            .db()
            .collection("admin")
            .findOne({ email: email });

        if (!verifyAdmin) {
            throw HttpError(
                401,
                "Email does not exist, please create a new account!"
            );
        }
        console.log(password);
        console.log(verifyAdmin.password);
        const correctPassword = await bcrypt.compare(password, verifyAdmin.password);
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
