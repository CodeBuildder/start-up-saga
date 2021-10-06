import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config({ path: "./.env" });


export const verifiedAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next("Invalid JWT");
        }

        const authToken = authorization.split(" ")[1];

        let payload;
        try {

            payload = verify(authToken, process.env.JWT_SECRET || "");
        } catch (err) {
            console.log(err)
        }

        next()
    } catch (err) {
        next(err)

    }
}
