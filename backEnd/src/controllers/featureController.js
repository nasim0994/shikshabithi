const fs = require("fs");
const Model = require("../models/feature.model");

exports.add = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const data = req?.body;
    const result = await Model.create({ ...data, icon });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Feature add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/feature/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.find({});

    res.status(200).json({
      success: true,
      message: "Feature get success",
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
        error: "Feature not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature get success",
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
  const icon = req?.file?.filename;

  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Feature not found",
      });
    }

    const data = req.body;

    if (icon) {
      fs.unlink(`./uploads/feature/${isExist?.icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Model.findByIdAndUpdate(
        id,
        { ...data, icon },
        {
          new: true,
        }
      );
    } else {
      await Model.findByIdAndUpdate(
        id,
        { ...data, icon: isExist?.icon },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Feature updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/feature/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Feature not found",
      });
    }

    if (isExist) {
      const result = await Model.findByIdAndDelete(id);

      if (result?._id) {
        fs.unlink(`./uploads/feature/${isExist?.icon}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

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
