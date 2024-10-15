const mongoose = require("mongoose");

const currentAffairsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["1", "2", "3"],
    },
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    explain: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CurrentAffairs = mongoose.model("CurrentAffairs", currentAffairsSchema);

module.exports = CurrentAffairs;
