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
  const { status } = req?.body;

  try {
    const paymentRequest = await Model.findById(id);

    if (!paymentRequest) {
      return res.json({
        success: false,
        message: "Payment Request not found",
      });
    }

    let newData = {
      status,
    };

    if (status == "approved" && !paymentRequest?.firstApproveDate) {
      newData.firstApproveDate = new Date();
    }

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    if (!result) {
      return res.json({
        success: false,
        message: "Payment Request status not updated",
      });
    }

    const user = await User.findById(result?.user);
    const package = await Package.findById(result?.package);

    if (status == "approved" && result?.firstApproveDate) {
      let expiresDate = result?.firstApproveDate;
      if (package?.type == "monthly") {
        expiresDate.setMonth(expiresDate.getMonth() + 1);
      } else {
        expiresDate.setFullYear(expiresDate.getFullYear() + 1);
      }

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
