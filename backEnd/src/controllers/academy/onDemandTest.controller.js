const OnDemandTest = require("../../models/academy/onDemandTestAttendModel");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");

exports.insert = async (req, res) => {
  const data = req?.body;
  try {
    const result = await OnDemandTest.create(data);

    res.status(200).json({
      success: true,
      message: "Model Test add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { subject, user } = req.query;

  try {
    let query = {};
    if (subject && subject !== "undefined") query.subject = subject;
    query.user = user;

    const result = await OnDemandTest.find(query)
      .skip(skip)
      .limit(limit)
      .populate("subject mcqs.mcq")
      .sort({ _id: -1 });

    const total = await OnDemandTest.countDocuments(query).sort({ _id: -1 });
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Model Test get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;
  try {
    const result = await OnDemandTest.findById(id).populate("subject mcqs.mcq");
    res.status(200).json({
      success: true,
      message: "Model Test get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await OnDemandTest.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Model Test not found",
      });
    }

    const result = await ModelTest.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Model Test not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Model Test updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destoy = async (req, res) => {
  try {
    const result = await OnDemandTest.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Model Test delete problem!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Model Test delete success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.totalAttend = async (req, res) => {
  const user = req.user;

  try {
    const result = await OnDemandTest.countDocuments({ user: user?._id });
    res.status(200).json({
      success: true,
      message: "Total by user get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
