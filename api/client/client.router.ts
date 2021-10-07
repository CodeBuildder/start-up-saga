import { Router, Request, Response, NextFunction } from "express";
import { userOrderDetails, findLocation } from "./client.controller";
import { userPostType } from "./client.schema";
import { verifiedAdmin } from "../middleware/auth";
const router: Router = Router();

router.post(
  "/api/user/order",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const userOrderData = req.body as userPostType;

    try {
      const { user } = res.locals.user;
      const result = await userOrderDetails(userOrderData, user._id);
      res.json(result).status(201);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
);

router.post(
  "/api/user/location",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const location = req.body.location;

    try {
      const result = await findLocation(location);
      res.json(result).status(201);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
);

export default router;
