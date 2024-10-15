const mongoose = require("mongoose");

const MCQSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
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
    },
    chapter: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
    subChapter: {
      type: mongoose.Types.ObjectId,
      ref: "SubChapter",
    },
    subSubChapter: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubChapter",
    },
    question: {
      type: String,
      required: true,
    },
    points: {
      type: Array,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
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
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tags",
      },
    ],
    sets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "QuestionSet",
      },
    ],
    jobSets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "JobQuesSet",
      },
    ],
  },
  { timestamps: true }
);

const MCQ = mongoose.model("MCQ", MCQSchema);

module.exports = MCQ;
