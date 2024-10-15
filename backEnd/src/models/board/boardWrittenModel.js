const mongoose = require("mongoose");

const boardWrittenSchema = new mongoose.Schema(
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

    writtens: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Written",
        required: true,
      },
    ],
  },
  { timestamps: false }
);

const BoardWritten = mongoose.model("BoardWritten", boardWrittenSchema);

module.exports = BoardWritten;
