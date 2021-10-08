import { Router, Request, Response, NextFunction } from "express";

import { userOrderDetails, getOrderDetails } from "./client.controller";

import { verifiedAdmin } from "../middleware/auth";
const router: Router = Router();

router.post(
  "/api/user/order",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const userOrderData = req.body;

    try {
      const { user } = res.locals.user;
      const result = await userOrderDetails(userOrderData, user._id);

      res.json(result);

    } catch (error) {
      next(error);
      
    }
  }
);



router.get(
  "/api/user/order",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals.user;
      const result = await getOrderDetails(user._id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
