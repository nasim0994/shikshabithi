const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;
