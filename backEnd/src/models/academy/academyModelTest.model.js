const mongoose = require("mongoose");

const academyModelTestSchema = new mongoose.Schema(
  {
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
    },
    examType: {
      type: String,
      required: true,
      enum: ["free", "paid"],
    },
    name: {
      type: String,
      required: true,
    },
    totalMark: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
    },
    negativeMark: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "pending", "deactive"],
    },
    participated: {
      type: Number,
      default: 0,
    },
    vendor: {
      type: String,
      default: "Admin",
    },
    examiner: {
      type: String,
      default: "Admin",
    },
    mcqs: [{ type: mongoose.Types.ObjectId, ref: "MCQ", required: true }],
  },
  { timestamps: false }
);

const AcademyModelTest = mongoose.model(
  "AcademyModelTest",
  academyModelTestSchema
);

module.exports = AcademyModelTest;
