import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  disapproveCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import requireRole from "../middleware/requireRole.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, requireRole('admin'), getAllComments);
adminRouter.get("/blogs", auth, requireRole('admin'), getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, requireRole('admin'), deleteCommentById);
adminRouter.post("/approve-comment", auth, requireRole('admin'), approveCommentById);
adminRouter.get("/dashboard", auth, requireRole('admin'), getDashboard);
adminRouter.post("/disapprove-comment", auth, requireRole('admin'), disapproveCommentById);

export default adminRouter;
