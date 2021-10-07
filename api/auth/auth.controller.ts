import * as mongodb from "mongodb";
import { userType, userSchema } from "./auth.schema";
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import { getClient } from "../db/db.connect";
import * as jwt from "jsonwebtoken";
export const registerUser = async (userData: userType) => {
  try {
    const client: mongodb.MongoClient = await getClient();
    const DB = await client.db().collection("users");

    if (await DB.findOne({ email: userData.email })) {
      throw HttpError(409, "User already exists!");
    }
    const salt = await bcrypt.genSalt(12);
  
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUserData = {
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      phone: userData.phone,
    };

   

    const response = await DB.insertOne(newUserData);
    const token = jwt.sign(
      {
        email: newUserData.email,
        _id: response.insertedId,
        category: "client",
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "10d" }
    );
    if (!response) {
      throw HttpError(500, "Internal Server Error!");
    }

    return {
      success: true,
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const client: mongodb.MongoClient = await getClient();
 
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
   
   
    const correctPassword = await bcrypt.compare(password, verifyUser.password);
 
    if (!correctPassword) {
      throw HttpError(401, "Password Incorrect, please try again.");
    }
    const token = jwt.sign(
      {
        email: verifyUser.email,
        _id: verifyUser._id,
        category: "client",
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "10d" }
    );
    return {
      success: true,
      token,
    };
  } catch (err) {
    throw err;
  }
};
