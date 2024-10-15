const Model = require("../models/faq.model");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "FAQ add success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.find({}).sort({ _id: -1 });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ get success",
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
  let { id } = req.params;

  try {
    const result = await Model.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ get success",
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
  const { id } = req?.params;
  const data = req?.body;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "FAQ not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ updated success",
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
  let { id } = req.params;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "FAQ delete success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
