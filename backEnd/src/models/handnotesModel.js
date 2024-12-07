const mongoose = require("mongoose");

const handnotesSchema = new mongoose.Schema(
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
    images: {
      type: Array,
      required: true,
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
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Handnotes = mongoose.model("Handnotes", handnotesSchema);

module.exports = Handnotes;
