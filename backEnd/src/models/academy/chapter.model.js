const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    order: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "AcademyCategory",
    },
    class: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
  },
  { timestamps: false }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
