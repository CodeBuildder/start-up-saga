import { Router, Request, Response, NextFunction } from "express";
import { companyType } from "./admin.schema";
import { verifiedAdmin } from "../middleware/auth";
import {
  registerAdmin,
  loginAdmin,
  postCompanyDetails,
  getFilterCompanyDetails,
} from "./admin.controller";

import jwt from "jsonwebtoken";

const router: Router = Router();

router.post(
  "/api/admin/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const adminData = req.body;

    try {
      const result = await registerAdmin(adminData);
      res.json(result).status(201);
      next();
    } catch (err) {
      next(err);
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
      next();
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/admin/company",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const companyData = req.body as companyType;

    try {
      const result = await postCompanyDetails(companyData);
      res.status(201).json({
        companyData,
        message: "You have successfully posted the job!",
      });
    } catch (err) {
      next(err);
    }
  }
);
interface filterData {
  fromAddress: string;
  toAddress: string;
  date: Date;
}
router.get(
  "/api/admin/company/filter",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const filterData = req.body as filterData;

    try {
      const result = await getFilterCompanyDetails(filterData);
      res.json({ result });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
