const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
