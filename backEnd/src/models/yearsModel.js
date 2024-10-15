const mongoose = require("mongoose");

const yearsSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: false,
  }
);

const Years = mongoose.model("Years", yearsSchema);

module.exports = Years;
