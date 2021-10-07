import * as jwt from "jsonwebtoken";
import * as mongodb from "mongodb";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import HttpError from "http-errors";
dotenv.config({ path: "./.env" });
// import { adminSchema } from "../admin/admin.schema";
// import { userSchema } from "../auth/auth.schema";
// import { getClient } from "../db/db.connect";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    email: string;
    _id: string;
  }
}

export const verifiedAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw HttpError(400, "not authorized");
    }

    const authToken = authorization.split(" ")[1];
    let payload;
    try {
      payload = <jwt.UserIDJwtPayload>(
        jwt.verify(authToken, process.env.JWT_SECRET || "")
      );
    } catch (err) {
      next(err);
    }
    let user;

    // const client: mongodb.MongoClient = await getClient();
    // if (payload) {
    //   if (payload.category == "user") {
    //     const DB = client.db().collection("users");
    //     user = await DB.findOne({ _id: payload._id });
    //   } else {
    //     const DB = client.db().collection("admin");
    //     user = await DB.findOne({ _id: payload._id });
    //   }
    // }
    // req.env = { user: user };
    next();
  } catch (err) {
    next(err);
  }
};
