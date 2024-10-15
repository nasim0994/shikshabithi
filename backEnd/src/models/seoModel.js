const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
    },
    author: {
      type: String,
    },
    sitemapLink: {
      type: String,
    },
    metaContent: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const SEO = mongoose.model("SEO", seoSchema);

module.exports = SEO;
