const Model = require("../models/tagsModel");

exports.add = async (req, res) => {
  try {
    const data = req?.body;

    const result = await Model.create(data);

    if (!result) {
      return res.status(204).json({
        success: false,
        error: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      message: "add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.find({});

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Model.findById(id);

    if (!result?._id) {
      return res.status(202).json({
        success: false,
        error: "not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "not found",
      });
    }

    const data = req.body;

    let result = await Model.findByIdAndUpdate(id, { name: data?.name });

    res.status(200).json({
      success: true,
      message: "updated success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(204).json({
        success: false,
        error: "not found",
      });
    }

    if (isExist) {
      const result = await Model.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Delete success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};
