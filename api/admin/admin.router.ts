import { Router, Request, Response, NextFunction } from "express";
import { verifiedAdmin } from "../middleware/auth";
import * as jwt from "jsonwebtoken";
import {
  registerAdmin,
  // loginAdmin,
  // postCompanyDetails,
  // getFilterCompanyDetails,
  // getOrderDetails
} from "./admin.controller";

const router: Router = Router();

router.post(
  "/api/admin/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const adminData = req.body;

    try {
      const result = await registerAdmin(adminData);

      const token = jwt.sign(
        {
          _id: result._id,
          email: adminData.email,

          category: "admin",
        },
        process.env.JWT_SECRET || "",
        { expiresIn: "10d" }
      );

      res.json({ token, result }).status(201);
    } catch (err) {
      next(err);
    }
  }
);
export default router;
// router.post(
//   "/api/admin/login",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { password, email } = req.body;
//     try {
//       const result = await loginAdmin(email, password);

//       res.json({ token: result, success: true });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// router.post(
//   "/api/admin/company",
//   verifiedAdmin,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const companyData = req.body as companyType;

//     try {
//       const { user } = res.locals.user;
//       const result = await postCompanyDetails(companyData, user._id);

//       res.status(201).json(result);
//     } catch (err) {
//       next(err);
//     }
//   }
// );
// interface filterData {
//   fromAddress: string;
//   toAddress: string;
//   date: Date;
// }
// router.post(
//   "/api/admin/company/filter",
//   verifiedAdmin,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const filterData = req.body as filterData;

//     try {
//       const result = await getFilterCompanyDetails(filterData);
//       res.json({ result });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// router.get(
//   "/api/admin/order",
//   verifiedAdmin,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { user } = res.locals.user;
//       const result = getOrderDetails(user._id)
//       res.status(201).json({ result })
//     } catch (error) {
//       next(error)
//     }
//   }
// )

// export default router;
