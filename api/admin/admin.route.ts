import { Router, Request, Response, NextFunction } from "express";
import { registerAdmin, loginAdmin } from "./admin.controller";

import jwt from "jsonwebtoken";

const router: Router = Router();

router.post(
    "/api/admin/register",
    async (req: Request, res: Response, next: NextFunction) => {
        const adminData = req.body;
        console.log(adminData)
        try {
            const result = await registerAdmin(adminData);
            res.json(result).status(201);
        } catch (err) {
            throw err;
        }
    }
);

router.post(
    "/api/admin/login",
    async (req: Request, res: Response, next: NextFunction) => {
        const { password, email } = req.body;

        try {
            const result = await loginAdmin(email, password);

            const token = jwt.sign(
                {
                    email: email.email,
                },
                process.env.JWT_SECRET || "",
                {
                    expiresIn: "10d",
                }
            );

            res.json({
                result,
                token,
                message: "Hello, Welcome to Post.io",
            });
        } catch (err) {
            throw err;
        }
    }
);

export default router;
