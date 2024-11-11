const mongoose = require("mongoose");

const modelTestSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mainCategory: {
      type: String,
      required: true,
      enum: ["academy", "admission", "job"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "categoryType",
    },
    categoryType: {
      type: String,
      enum: ["AcademyCategory", "University", "Institute"],
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "subCategoryType",
    },
    subCategoryType: {
      type: String,
      enum: ["Class", "QuestionSet", "JobQuesSet"],
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
    mcqs: [{ type: mongoose.Types.ObjectId, ref: "MCQ", required: true }],
  },
  { timestamps: false }
);

const ModelTest = mongoose.model("ModelTest", modelTestSchema);

module.exports = ModelTest;
