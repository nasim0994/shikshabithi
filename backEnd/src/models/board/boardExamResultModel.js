const mongoose = require("mongoose");

const BoardExamAttendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boardExam: {
      type: mongoose.Types.ObjectId,
      ref: "BoardMCQ",
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

const BoardExamAttend = mongoose.model(
  "BoardExamAttend",
  BoardExamAttendSchema
);

module.exports = BoardExamAttend;