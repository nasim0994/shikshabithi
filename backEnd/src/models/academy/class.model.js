const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    fixed: {
      type: Boolean,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "AcademyCategory",
    },
  },
  { timestamps: false }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
