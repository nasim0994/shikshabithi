const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const University = mongoose.model("University", universitySchema);

module.exports = University;
