const mongoose = require("mongoose");

const boardMCQSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    passMark: {
      type: String,
      required: true,
    },

    class: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: true,
    },
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
  { timestamps: false }
);

const BoardMCQ = mongoose.model("BoardMCQ", boardMCQSchema);

module.exports = BoardMCQ;
