const mongoose = require("mongoose");

const writtenSchema = new mongoose.Schema(
  {
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
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
    },
    explain: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
    view: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Written = mongoose.model("Written", writtenSchema);

module.exports = Written;
