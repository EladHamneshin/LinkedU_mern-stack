import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;