import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  disapproveCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  getAdminDashboard
} from "../controllers/adminController.js";
import auth, { authorize } from "../middleware/auth.js";

const adminRouter = express.Router();

// Public admin login
adminRouter.post("/login", adminLogin);

// Protected admin routes (require admin role)
adminRouter.get("/comments", auth, authorize('admin'), getAllComments);
adminRouter.get("/blogs", auth, authorize('admin'), getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, authorize('admin'), deleteCommentById);
adminRouter.post("/approve-comment", auth, authorize('admin'), approveCommentById);
adminRouter.post("/disapprove-comment", auth, authorize('admin'), disapproveCommentById);

// Dashboard routes
adminRouter.get("/dashboard", auth, authorize('admin'), getAdminDashboard); // Updated admin dashboard
adminRouter.get("/dashboard-old", auth, getDashboard); // Keep old dashboard for backward compatibility

// User management routes (admin only)
adminRouter.get("/users", auth, authorize('admin'), getAllUsers);
adminRouter.get("/users/:id", auth, authorize('admin'), getUserById);
adminRouter.put("/users/:id/status", auth, authorize('admin'), updateUserStatus);
adminRouter.put("/users/:id/role", auth, authorize('admin'), updateUserRole);
adminRouter.delete("/users/:id", auth, authorize('admin'), deleteUser);

export default adminRouter;
