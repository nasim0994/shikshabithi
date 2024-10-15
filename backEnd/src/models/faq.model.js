const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
