const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    bg: {
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
  },
  {
    timestamps: false,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
