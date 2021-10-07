import {
  Company, Admin
} from "./admin.schema";
import HttpError from "http-errors";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { adminDB } from "../../types/types";


export const registerAdmin = async (adminData: adminDB) => {


  try {

    if (await Company.findOne({ companyName: adminData.companyName })) {
      throw HttpError(409, "User already exists!");
    }
    const salt = await bcrypt.genSalt(12);
    console.log(adminData.password);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const newAdminData = {
      companyName: adminData.companyName,
      password: hashedPassword,
      email: adminData.email,
      phone: adminData.phone,
      address: adminData.address,
    };



    return {
      newAdminData,
      success: true
    };
  } catch (err) {
    throw err;
  }
};

// export const loginAdmin = async (email: string, password: string) => {
//   try {
//     const client: mongodb.MongoClient = await getClient();
//     console.log(email);

//     const verifyAdmin = await client
//       .db()
//       .collection("admin")
//       .findOne({ email: email });

//     if (!verifyAdmin) {
//       throw HttpError(
//         401,
//         "Email does not exist, please create a new account!"
//       );
//     }

//     const correctPassword = await bcrypt.compare(
//       password,
//       verifyAdmin.password
//     );

//     if (!correctPassword) {
//       throw HttpError(401, "Password Incorrect, please try again.");
//     }
//     const token = jwt.sign(
//       {
//         email: verifyAdmin.email,
//         _id: verifyAdmin._id,
//         category: "admin",
//       },
//       process.env.JWT_SECRET || "",
//       { expiresIn: "10d" }
//     );
//     return token;
//   } catch (err) {
//     throw err;
//   }
// };

// export const postCompanyDetails = async (
//   companyData: companyType,
//   id: mongodb.ObjectID
// ) => {
//   try {
//     const client: mongodb.MongoClient = await getClient();
//     const DB = client.db().collection("companyDetails");
//     const newAdminData = {
//       companyId: id,
//       fromAddress: companyData.fromAddress,
//       toAddress: companyData.toAddress,
//       date: companyData.date,
//       price: companyData.price,
//     };

//     const response = await DB.insertOne(newAdminData);

//     if (!response) {
//       throw HttpError(500, "Internal Server Error!");
//     }

//     return response.ops[0];
//   } catch (err) {
//     throw err;
//   }
// };

// interface filterData {
//   fromAddress: string;
//   toAddress: string;
//   date: Date;
// }
// export const getFilterCompanyDetails = async (data: filterData) => {
//   try {
//     const client: mongodb.MongoClient = await getClient();
//     const DB = await client.db().collection("companyDetails");

//     // const test = await DB.aggregate([{ $unwind: "$date" }]).toArray();
//     const filteredData = await DB.find({
//       fromAddress: { $regex: `^${data.fromAddress}`, $options: "i" },
//       toAddress: { $regex: `^${data.toAddress}`, $options: "i" },
//       date: { $elemMatch: { $gte: data.date } },
//     }).toArray();
//     // const findIt = await DB.find({
//     //   city: { $regex: `^${data}`, $options: "i" },
//     // }).toArray();
//     return filteredData;
//   } catch (err) {
//     throw err;
//   }
// };


// export const getOrderDetails = async (id: mongodb.ObjectID) => {
//   try {
//     const client: mongodb.MongoClient = await getClient();
//     const DB = client.db().collection("userOrder");

//     const companyOrders = await DB.find({ id }).toArray()

//     return companyOrders

//   } catch (error) {
//     throw error
//   }
// }