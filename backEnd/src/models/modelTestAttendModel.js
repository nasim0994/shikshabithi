const mongoose = require("mongoose");

const modelTestAttendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modelTest: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "modelTestType",
    },
    modelTestType: {
      type: String,
      enum: ["JobModelTest", "AcademyModelTest", "AdmissionModelTest"],
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

const ModelTestAttend = mongoose.model(
  "ModelTestAttend",
  modelTestAttendSchema
);

module.exports = ModelTestAttend;
