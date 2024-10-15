const mongoose = require("mongoose");

const admissionModelTestAttendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modelTest: {
      type: mongoose.Types.ObjectId,
      ref: "AdmissionModelTest",
      required: true,
    },
    mcqs: [
      {
        mcq: { type: mongoose.Types.ObjectId, ref: "MCQ" },
        rightAns: { type: String },
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

const AdmissionModelTestAttend = mongoose.model(
  "AdmissionModelTestAttend",
  admissionModelTestAttendSchema
);

module.exports = AdmissionModelTestAttend;
