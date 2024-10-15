const mongoose = require("mongoose");

const jobMCQSchema = new mongoose.Schema(
  {
    institute: {
      type: mongoose.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    questionSet: {
      type: mongoose.Types.ObjectId,
      ref: "JobQuesSet",
      required: true,
    },
    subjects: [
      {
        subject: {
          type: mongoose.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        mcqs: [
          {
            type: mongoose.Types.ObjectId,
            ref: "MCQ",
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: false }
);

const JobMCQ = mongoose.model("JobMCQ", jobMCQSchema);

module.exports = JobMCQ;
