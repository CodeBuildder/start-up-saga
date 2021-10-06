import { Router, Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.controller";

import jwt from "jsonwebtoken";

const router: Router = Router();

router.post(
  "/api/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    try {
      const result = await registerUser(userData);
      res.json(result).status(201);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    try {
      const result = await loginUser(email, password);

      const token = jwt.sign(
        {
          email: email.email,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "10d",
        }
      );

      res.status(201).json({
        result,
        token,
        message: "User successfully logged in!",
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
