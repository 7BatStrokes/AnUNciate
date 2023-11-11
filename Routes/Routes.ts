import { Router } from "express";
import * as Conts from "../Controller/Controllers";

const router= Router();

//User Management
router.put("/user/:id", Conts.putUsuario);
router.delete("/id/:id", Conts.deleteUsuario);

//Login and Register
router.post("/login", Conts.postLogin);
router.post("/logout", Conts.postLogOut);
router.get("/auth", Conts.getAuthenticate);
router.post("/refresh", Conts.postRefreshToken);
router.post("/register", Conts.postRegister);

//Images
router.get("/images/pub/:id", Conts.getPubImgs)
router.post("/upload", Conts.postImage);

//Publications
router.get("/home", Conts.getHomePubs)
router.get("/find/:tags", Conts.getPubswTags)
router.get("/sales", Conts.getSales)
router.get("/pub/:id", Conts.getPubInfo)
router.get("/category", Conts.getPubswCat);

//Categories
router.get("/categories", Conts.getAllCats);

export default router;