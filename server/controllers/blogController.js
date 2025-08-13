// server/controllers/blogController.js
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import generateWithGemini from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog || "{}"
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResp = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadResp.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res
      .status(201)
      .json({ success: true, message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in uploading blog " + error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog fetched successfully", blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    // await Comment.deleteMany({ blog: id }); // optional cascade delete
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.json({ success: false, message: "Blog not found" });
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;
    if (!blogId || !name || !content) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    await Comment.create({ blog: blogId, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt is required" });
    }

    const improvedPrompt = `
Write a detailed, engaging, and well-structured blog post on: "${prompt}".
Format the output in clean HTML that is compatible with the Quill editor.
Use:
- don't generate code blocks if you want to add some code try to add it in box not in code block
- Start with a catchy introduction and heading always
- <h2> for main section headings
- <h3> for subheadings
- <p> for paragraphs
- <ul> / <ol> for lists
- <table> for tabular data (if applicable)
Do not include <html>, <head>, or <body> tags — only the inner content.
Keep the tone conversational and easy to read for a general audience.
Make the introduction catchy and the conclusion impactful.
    `.trim();

    const content = await generateWithGemini(improvedPrompt);

    // Optional server-side log to verify data is generated
    console.log("Generated Content Length:", content?.length);

    res.json({
      success: true,
      message: "Content generated successfully",
      content,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
