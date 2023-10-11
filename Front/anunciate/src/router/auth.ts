import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/refreshToken", AuthController.refreshToken);
router.post("/login", AuthController.login);

export default router;