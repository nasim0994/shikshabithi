const mongoose = require("mongoose");

const admissionMCQSchema = new mongoose.Schema(
  {
    university: {
      type: mongoose.Types.ObjectId,
      ref: "University",
      required: true,
    },
    questionSet: {
      type: mongoose.Types.ObjectId,
      ref: "QuestionSet",
      required: true,
    },
    subjects: [
      {
        subject: {
          type: mongoose.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        mcqs: [{ type: mongoose.Types.ObjectId, ref: "MCQ", required: true }],
      },
    ],
  },
  { timestamps: false }
);

const AdmissionMCQ = mongoose.model("AdmissionMCQ", admissionMCQSchema);

module.exports = AdmissionMCQ;
