import express from "express";
import { authHandler } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js";
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use("/auth", authRoutes);

router.post("/", userController.registerUser);
router.route("/profile")
      .get(authHandler, userController.getUserProfile)
      .put(authHandler, userController.updateUserProfile);

export default router;