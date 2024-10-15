const mongoose = require("mongoose");

const admissionModelTestSchema = new mongoose.Schema(
  {
    university: {
      type: mongoose.Types.ObjectId,
      ref: "University",
      required: true,
    },
    set: {
      type: mongoose.Types.ObjectId,
      ref: "QuestionSet",
      required: true,
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
  { timestamps: true }
);

const AdmissionModelTest = mongoose.model(
  "AdmissionModelTest",
  admissionModelTestSchema
);

module.exports = AdmissionModelTest;
