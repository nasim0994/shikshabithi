const fs = require("fs");
const Model = require("../models/featureImageModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    let isExist = await Model.findOne({});

    if (isExist) {
      fs.unlink(`./uploads/feature/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(202).json({
        success: false,
        message: "Feature Image already added",
      });
    }

    const result = await Model.create({ image });

    res.status(200).json({
      success: true,
      message: "Feature Image added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/feature/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.findOne({});

    res.status(200).json({
      success: true,
      message: "Feature Image found successfully",
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
  const image = req?.file?.filename;

  try {
    if (!image) {
      return res.status(400).json({
        success: false,
        error: "Feature Image is required",
      });
    }

    const id = req?.params?.id;
    const isExist = await Model.findOne({ _id: id });

    if (!isExist) {
      fs.unlink(`./uploads/feature/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(404).json({
        success: false,
        error: "Feature Image not found",
      });
    }

    await Model.findByIdAndUpdate(id, { image: image }, { new: true });

    res.status(200).json({
      success: true,
      message: "Feature Image updated successfully",
    });

    fs.unlink(`./uploads/feature/${isExist?.image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/feature/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
