import { Router, Request, Response, NextFunction } from "express";
import { userOrderDetails, findLocation } from "./client.controller";
import { userPostType } from "./client.schema";

const router: Router = Router();

router.post(
  "/api/user/order",
  async (req: Request, res: Response, next: NextFunction) => {
    const userOrderData = req.body as userPostType;

    try {
      const result = await userOrderDetails(userOrderData);
      res.json(userOrderData).status(201);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
);

router.post(
  "/api/user/location",
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
