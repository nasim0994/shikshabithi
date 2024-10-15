const mongoose = require("mongoose");

const jobModelTestSchema = new mongoose.Schema(
  {
    institute: {
      type: mongoose.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    set: {
      type: mongoose.Types.ObjectId,
      ref: "JobQuesSet",
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

const JobModelTest = mongoose.model("JobModelTest", jobModelTestSchema);

module.exports = JobModelTest;
