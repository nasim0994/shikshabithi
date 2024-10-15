const fs = require("fs");
const Model = require("../models/banner.model");

exports.add = async (req, res) => {
  let bg = req?.file?.filename;
  let data = req.body;
  try {
    let isExist = await Model.findOne({});
    if (isExist) {
      fs.unlink(`./uploads/banner/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(202).json({
        success: false,
        message: "Banner already added",
      });
    }

    const result = await Model.create({ ...data, bg });

    res.status(200).json({
      success: true,
      message: "Banner added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/banner/${bg}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.findOne({});

    if (!result) {
      return res.status(202).json({
        success: false,
        error: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const bg = req?.file?.filename;

  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    const data = req.body;

    if (bg) {
      fs.unlink(`./uploads/banner/${isExist?.bg}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Model.findByIdAndUpdate(
        id,
        { ...data, bg },
        {
          new: true,
        }
      );
    } else {
      await Model.findByIdAndUpdate(
        id,
        { ...data, bg: isExist?.bg },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Banner updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/banner/${bg}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
