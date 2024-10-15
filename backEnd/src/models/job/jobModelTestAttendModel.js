const mongoose = require("mongoose");

const jobModelTestAttendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modelTest: {
      type: mongoose.Types.ObjectId,
      ref: "JobModelTest",
      required: true,
    },
    mcqs: [
      {
        mcq: { type: mongoose.Types.ObjectId, ref: "MCQ", required: true },
        rightAns: { type: String, required: true },
        selectedAns: { type: String },
      },
    ],
    result: {
      obtainMark: { type: Number },
      resultType: { type: String },
      totalNegativeMark: { type: Number },
      totalRightAns: { type: Number },
      totalWrongAns: { type: Number },
      totalNoAns: { type: Number },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const JobModelTestAttend = mongoose.model(
  "JobModelTestAttend",
  jobModelTestAttendSchema
);

module.exports = JobModelTestAttend;
