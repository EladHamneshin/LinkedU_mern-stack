import express from "express";
import { authHandler } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authHandler, getUserProfile)
  .put(authHandler, updateUserProfile);

export default router;