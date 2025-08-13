import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .sort({ createdAt: -1 })
      .populate("blog");
    res.json({ success: true, comments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };

    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      // CHANGE: The key is now "dashboardData" to match what the frontend expects.
      dashboardData: dashboardData,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    // FIX: Find and delete from the Comment collection, not the Blog collection.
    await Comment.findByIdAndDelete(id);

    // The line below was incorrect and has been removed.
    // await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      // FIX: The success message is now accurate.
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const disapproveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: false });
    res.json({ success: true, message: "Comment disapproved successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
