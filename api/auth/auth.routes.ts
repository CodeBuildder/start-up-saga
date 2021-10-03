import { Router, Request, Response, NextFunction } from "express";
import { userType } from "./auth.schema";
import { registerUser } from './auth.controller'

const router: Router = Router()

router.post('/api/register', registerUser)

export default router