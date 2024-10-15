const mongoose = require("mongoose");

const subChapterSchema = new mongoose.Schema(
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
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
  },
  { timestamps: false }
);

const SubChapter = mongoose.model("SubChapter", subChapterSchema);

module.exports = SubChapter;
