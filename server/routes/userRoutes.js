import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getUserDashboard
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes (no authentication required)
userRouter.post("/register", register);
userRouter.post("/login", login);

// Protected routes (authentication required)
userRouter.get("/profile", auth, getProfile);
userRouter.put("/profile", auth, updateProfile);
userRouter.put("/change-password", auth, changePassword);
userRouter.get("/dashboard", auth, getUserDashboard);

export default userRouter;