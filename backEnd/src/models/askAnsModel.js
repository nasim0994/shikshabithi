const mongoose = require("mongoose");

const askAnsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: "AskQuestion",
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AskAns = mongoose.model("AskAns", askAnsSchema);

module.exports = AskAns;
