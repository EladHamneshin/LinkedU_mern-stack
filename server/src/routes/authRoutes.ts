import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/", authController.authUser);

export default router;