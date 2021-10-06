import * as mongodb from "mongodb";
import {
    adminType,
    adminSchema,
    companySchema,
    companyType,
} from "./admin.schema";
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import { getClient } from "../db/db.connect";

export const registerAdmin = async (adminData: adminType) => {
    await adminSchema.validate(adminData).catch((err: any) => {
        throw HttpError(400, "Validation Error!");
    });

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
            address: adminData.address,
        };

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

        const correctPassword = await bcrypt.compare(
            password,
            verifyAdmin.password
        );

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

export const postCompanyDetails = async (companyData: companyType) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("admin");

        const newAdminData = {
            name: companyData.companyName,
            fromAddress: companyData.fromAddress,
            toAddress: companyData.toAddress,
            date: companyData.date,
            weight: companyData.weight,
            price: companyData.price,
        };

        const response = await DB.insertOne(newAdminData);

        if (!response) {
            throw HttpError(500, "Internal Server Error!");
        }

        // export const getCompanyDetails = async () => {
        //     try {
        //         const client: mongodb.MongoClient = await getClient();
        //         const DB = await client.db().collection("companyDetails");

        //         const response = DB.find({})
        //         console.log(response)
        //         if (!response) {
        //             throw HttpError(404, "Postal Services Unavialble at the moment.");
        //         }
        //         return {
        //             response,
        //             success: true
        //         }
        //     } catch (error) {
        //         throw error
        //     }
        // }
        return {
            response,
            success: true,
            _id: response.insertedId,
        };
    } catch (err) {
        throw err;
    }
}

interface filterData {
    fromAddress: string;
    toAddress: string;
    date: Date;
}
export const getFilterCompanyDetails = async (data: filterData) => {
    try {
        const client: mongodb.MongoClient = await getClient();
        const DB = await client.db().collection("admin");
        const regexFromAddress = new RegExp(data.fromAddress, "i");
        const regexToAddress = new RegExp(data.toAddress, "i");
        // const test = await DB.aggregate([{ $unwind: "$date" }]).toArray();
        const filteredData = await DB.find({
            fromAddress: { $regex: regexFromAddress },
            toAddress: { $regex: regexToAddress },
            date: { $elemMatch: { $gte: data.date } },
        }).toArray();
        return filteredData;
    } catch (err) {
        throw err;
    }
};
