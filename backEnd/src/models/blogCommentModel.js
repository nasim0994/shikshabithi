const mongoose = require("mongoose");

const blogCommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blogs",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

module.exports = BlogComment;
