import { Router } from "express";
import * as Conts from "../Controller/Controllers";
import { bucket, multer } from "../Back/Models";
import { v4 as uuidv4 } from "uuid";
import { createImg } from "../Functions/Funcs";


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
router.get("/upload", Conts.getImage);
router.post("/upload", Conts.uploadImage);

export default router;