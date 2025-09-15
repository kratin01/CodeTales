import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Made optional for anonymous comments
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false, // Optional for registered users
    },
    content: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Index for better performance
commentSchema.index({ blog: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ isApproved: 1 });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;