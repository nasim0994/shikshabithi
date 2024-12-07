const ModelTest = require("../models/modelTestModel");
const MCQ = require("../models/academy/mcq.model");
const Written = require("../models/academy/written.model");

const Blog = require("../models/blogsModel");
const Feature = require("../models/feature.model");

const User = require("../models/userModel");

exports.get = async (req, res) => {
  try {
    const modelTestCount = await ModelTest.countDocuments();
    const mcqCount = await MCQ.countDocuments();
    const writtenCount = await Written.countDocuments();

    const blogCount = await Blog.countDocuments();
    const featureCount = await Feature.countDocuments();

    const userCount = await User.countDocuments();

    const totalQuestion = modelTestCount + mcqCount + writtenCount;
    const totalContent = blogCount + featureCount;

    res.status(200).json({
      success: true,
      data: {
        totalQuestion,
        totalContent,
        totalUser: userCount,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error occurred",
    });
  }
};
