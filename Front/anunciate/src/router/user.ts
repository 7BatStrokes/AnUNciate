import { Router } from "express";
 import { checkAuthToken } from "../middlewares/checkAuthToken";
 import UserController from "../controller/UserController"

const router = Router();
router.get("/check", [ checkAuthToken ], UserController.check);

export default router;