const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "AcademyCategory",
    },
    class: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: false }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
