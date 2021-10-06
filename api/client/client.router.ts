import { Router, Request, Response, NextFunction } from "express";
import { userOrderDetails } from "./client.controller";
import { userPostType } from "./client.schema";

const router: Router = Router();

router.post('/api/user/order',
    async (req: Request, res: Response, next: NextFunction) => {

        const userOrderData = req.body as userPostType

        try {
            const result = await userOrderDetails(userOrderData)
            res.json(userOrderData).status(201)
        } catch (error) {
            next(error)
            console.log(error)
        }

    }
)


export default router