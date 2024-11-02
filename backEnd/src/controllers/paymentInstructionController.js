const Model = require("../models/paymentInstructionModel");

exports.add = async (req, res) => {
  try {
    const isExist = await Model.findOne({});
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Payment Instruction already exists",
      });
    }

    const result = await Model.create(req.body);

    res.status(201).json({
      success: true,
      message: "Payment Instruction created successfully",
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
    const result = await Model.findOne({});
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Payment Instruction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Instruction fetched successfully",
      data: result,
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
    const result = await Model.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Payment Instruction not found",
      });
    }

    const updateResult = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Payment Instruction updated successfully",
      data: updateResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
