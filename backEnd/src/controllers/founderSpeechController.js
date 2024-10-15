const fs = require("fs");
const Model = require("../models/founderSpeech.model");

exports.add = async (req, res) => {
  let image = req?.file?.filename;
  let data = req.body;

  try {
    let isExist = await Model.findOne({});
    if (isExist) {
      fs.unlink(`./uploads/founder/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(202).json({
        success: false,
        message: "Founder speech already added",
      });
    }

    const result = await Model.create({ ...data, image });

    res.status(200).json({
      success: true,
      message: "Founder speech add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/founder/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.findOne({}).sort({ _id: -1 });

    if (!result?._id) {
      return res.status(202).json({
        success: false,
        message: "Founder speech not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Founder speech get success",
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
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Founder speech not found",
      });
    }

    const data = req.body;

    if (image) {
      fs.unlink(`./uploads/founder/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Model.findByIdAndUpdate(
        id,
        { ...data, image },
        {
          new: true,
        }
      );
    } else {
      await Model.findByIdAndUpdate(
        id,
        { ...data, image: isExist?.image },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Founder speech updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/founder/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
