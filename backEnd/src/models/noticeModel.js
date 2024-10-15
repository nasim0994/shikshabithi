const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["active", "pending"],
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
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
