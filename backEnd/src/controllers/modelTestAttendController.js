const Model = require("../models/modelTestAttendModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;

    const result = await Model.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Model Test add success",
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { user, modelTestType } = req.query;

  try {
    let query = {};
    query.user = user;
    query.modelTestType = modelTestType;

    const result = await Model.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("modelTest mcqs.mcq");

    const total = await Model.countDocuments(query).sort({ _id: -1 });
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Model test get success.",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;
  try {
    const result = await Model.findById(id).populate("modelTest mcqs.mcq");
    res.status(200).json({
      success: true,
      message: "Model Test get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        error: "Model Test not found!",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Model Test delete success",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "something went wront!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
