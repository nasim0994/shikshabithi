const mongoose = require("mongoose");

const subSubChapterSchema = new mongoose.Schema(
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
    subChapter: {
      type: mongoose.Types.ObjectId,
      ref: "SubChapter",
    },
  },
  { timestamps: false }
);

const SubSubChapter = mongoose.model("SubSubChapter", subSubChapterSchema);

module.exports = SubSubChapter;
