import { Router } from "express";
import * as Conts from "../Controller/Controllers";

const router= Router();

//User Management
router.put("/id/:id", Conts.putUsuario);
router.delete("/id/:id", Conts.deleteUsuario);

//Login and Register
router.post("/login", Conts.postLogin);
router.post("/logout", Conts.postLogOut);
router.get("/auth", Conts.getAuthenticate);
router.post("/refresh", Conts.refreshToken);
router.post("/register", Conts.postRegister);

//Images
router.get("/pub/:id", Conts.getPubImgs)
router.post("/upload", Conts.uploadImage);

//Publications
router.get("/home", Conts.getHomePubs)
router.get("/find/:tags", Conts.findPubs)

export default router;