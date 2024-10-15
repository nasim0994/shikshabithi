const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Types.ObjectId,
      ref: "University",
      required: true,
    },
  },
  { timestamps: false }
);

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

module.exports = QuestionSet;
