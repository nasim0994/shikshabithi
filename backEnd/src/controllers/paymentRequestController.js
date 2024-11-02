const Model = require("../models/paymentRequestModel");
const User = require("../models/userModel");
const Package = require("../models/package.model");

exports.add = async (req, res) => {
  try {
    const result = await Model.create({ ...req.body, status: "pending" });

    res.status(201).json({
      success: true,
      message: "Payment Request created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Model.find({})
      .populate({
        path: "user",
        select: "email profile",
        populate: {
          path: "profile",
          select: "name",
        },
      })
      .populate("package", "title type");
    if (!result) {
      return res.json({
        success: false,
        message: "Payment Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Request fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Model.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Payment Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Request fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Payment Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Request deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Model.findByIdAndUpdate(id, {
      status: req.body.status,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Payment Request status not updated",
      });
    }

    // status == "approved" add user model package id
    const paymentRequest = await Model.findById(id);
    const user = await User.findById(paymentRequest?.user);
    const package = await Package.findById(paymentRequest?.package);

    let expiresDate = new Date();
    if (package.type == "monthly") {
      expiresDate.setMonth(expiresDate.getMonth() + 1);
    } else {
      expiresDate.setFullYear(expiresDate.getFullYear() + 1);
    }

    if (req.body.status == "approved") {
      user.package.package = paymentRequest?.package;
      user.package.expires = expiresDate;
      user.package.status = "active";
      await user.save();
    } else {
      user.package = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment Request status updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
