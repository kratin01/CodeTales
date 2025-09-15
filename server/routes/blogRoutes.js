// server/routes/blogRoutes.js
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import requireRole from "../middleware/requireRole.js";
import auth from "../middleware/auth.js";
import { commentRateLimiter } from "../middleware/rateLimiter.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, requireRole('admin'), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, requireRole('admin'), deleteBlogById);
blogRouter.post("/toggle-publish", auth, requireRole('admin'), togglePublish);
blogRouter.post("/add-comment", commentRateLimiter, addComment);
blogRouter.post("/comments", getBlogComments);

blogRouter.post("/generate", auth, requireRole('admin'), generateContent);

export default blogRouter;
