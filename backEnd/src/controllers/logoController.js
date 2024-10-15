const fs = require("fs");
const Logo = require("../models/logoModel");

exports.add = async (req, res) => {
  let logo = req?.file?.filename;
  try {
    let isExist = await Logo.findOne({});
    if (isExist) {
      fs.unlink(`./uploads/logo/${logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(202).json({
        success: false,
        message: "Logo already added",
      });
    }

    const result = await Logo.create({ logo });

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const logo = await Logo.findOne({});

    if (!logo) {
      return res.status(404).json({
        success: false,
        error: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.status(400).json({
        success: false,
        error: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findById(id);

    if (isLogo) {
      await Logo.findByIdAndUpdate(id, { logo: logo }, { new: true });

      fs.unlink(`./uploads/logo/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
