const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
    fixed: {
      type: Boolean,
    },
  },
  { timestamps: false }
);

const AcademyCategory = mongoose.model("AcademyCategory", categorySchema);

module.exports = AcademyCategory;
