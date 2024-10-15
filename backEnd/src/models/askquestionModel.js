const mongoose = require("mongoose");

const askQuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
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
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
  },
  {
    timestamps: true,
  }
);

const AskQuestion = mongoose.model("AskQuestion", askQuestionSchema);

module.exports = AskQuestion;
