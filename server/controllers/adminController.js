import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Legacy admin login - kept for backward compatibility
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First try to find admin user in database
    const adminUser = await User.findOne({ email, role: 'admin' });
    
    if (adminUser) {
      // Verify password
      const isPasswordValid = await adminUser.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      // Check if account is active
      if (!adminUser.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated"
        });
      }

      // Update last login
      await adminUser.updateLastLogin();

      // Generate token
      const token = jwt.sign(
        { userId: adminUser._id, email: adminUser.email, role: adminUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({ 
        success: true, 
        message: "Login successful", 
        token,
        user: {
          _id: adminUser._id,
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role
        }
      });
    }

    // Fallback to environment variables for backward compatibility
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
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(4);
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

// User Management Functions

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    const query = {};

    // Add search functionality
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'profile.firstName': { $regex: search, $options: 'i' } },
        { 'profile.lastName': { $regex: search, $options: 'i' } }
      ];
    }

    // Add role filter
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user by ID (admin only)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Get user's blog count
    const blogCount = await Blog.countDocuments({ author: id });
    
    // Get user's comment count
    const commentCount = await Comment.countDocuments({ author: id });

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        blogCount,
        commentCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user status (admin only)
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean value"
      });
    }

    // Prevent admin from deactivating themselves
    if (req.user._id.toString() === id && !isActive) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account"
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'user' or 'admin'"
      });
    }

    // Prevent admin from changing their own role
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role"
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: `User role updated to ${role} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account"
      });
    }

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user has blogs or comments
    const blogCount = await Blog.countDocuments({ author: id });
    const commentCount = await Comment.countDocuments({ author: id });

    if (blogCount > 0 || commentCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete user. User has ${blogCount} blogs and ${commentCount} comments. Please reassign or delete them first.`
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get admin dashboard with user statistics
export const getAdminDashboard = async (req, res) => {
  try {
    // Get basic statistics
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const activeUsers = await User.countDocuments({ isActive: true });
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(4);
    const totalBlogs = await Blog.countDocuments();
    const totalComments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    // Get user activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsersLast30Days = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    });

    const dashboardData = {
      users: {
        total: totalUsers,
        admins: totalAdmins,
        active: activeUsers,
        recent: recentUsers,
        activeLast30Days: activeUsersLast30Days
      },
      blogs: {
        total: totalBlogs,
        drafts: drafts,
        published: totalBlogs - drafts
      },
      comments: totalComments,
      recentBlogs
    };

    res.json({
      success: true,
      message: "Admin dashboard data fetched successfully",
      dashboardData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
