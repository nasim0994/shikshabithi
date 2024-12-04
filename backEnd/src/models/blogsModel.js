const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "active"],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["academy", "admission", "job", "others"],
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tags",
      },
    ],
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
    viewers: [
      {
        user: {
          type: String,
        },
      },
    ],
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
