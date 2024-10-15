const Model = require("../../models/job/jobModelTestModel");

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
      res.status(400).json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const { subject } = req.query;
  try {
    let query = {};
    if (subject && subject !== "undefined" && subject !== null)
      query.subject = subject;

    const result = await Model.find(query).populate("institute set mcqs").sort({ _id: -1 });

    res.status(200).json({
      success: true,
      message: "Model test get success",
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
    const result = await Model.findById(id).populate("institute set mcqs");
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
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Model Test not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result?._id) {
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

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(400).json({
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
