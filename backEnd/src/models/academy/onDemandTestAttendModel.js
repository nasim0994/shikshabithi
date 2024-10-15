const mongoose = require("mongoose");

const onDemandTestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
    date: {
      type: String,
      required: true,
    },
    totalQuestion: {
      type: Number,
      required: true,
    },
    totalMark: {
      type: Number,
      required: true,
    },
    negativeMark: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    result: {
      obtainMark: { type: Number },
      resultType: { type: String },
      totalNegativeMark: { type: Number },
      totalRightAns: { type: Number },
      totalWrongAns: { type: Number },
      totalNoAns: { type: Number },
    },
    mcqs: [
      {
        mcq: { type: mongoose.Types.ObjectId, ref: "MCQ" },
        rightAns: { type: String },
        selectedAns: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const OnDemandTestAttend = mongoose.model("OnDemandTestAttend", onDemandTestSchema);

module.exports = OnDemandTestAttend;
