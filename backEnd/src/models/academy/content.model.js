const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "AcademyCategory",
      required: true,
    },
    class: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    subChapter: {
      type: mongoose.Types.ObjectId,
      ref: "SubChapter",
      required: false,
    },
    subSubChapter: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubChapter",
      required: false,
    },
  },
  { timestamps: false }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
