
import express from "express";
import { singup,login,logout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/singup", singup);
router.get("/login", login);
router.post("/logout",logout);



 
export default router;