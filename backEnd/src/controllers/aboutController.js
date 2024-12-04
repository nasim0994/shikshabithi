const Model = require("../models/aboutModel");

exports.add = async (req, res) => {
  try {
    const isExist = await Model.findOne({});
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Aboutus already exists",
      });
    }

    const result = await Model.create(req.body);

    res.status(201).json({
      success: true,
      message: "Aboutus created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const privacy = await Model.findOne({});
    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Aboutus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aboutus fetched successfully",
      data: privacy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;

  try {
    const privacy = await Model.findById(id);

    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Aboutus not found",
      });
    }

    const updatedPrivacy = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Aboutus updated successfully",
      data: updatedPrivacy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
