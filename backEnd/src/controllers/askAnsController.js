const Model = require("../models/askAnsModel");

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
    const { question } = req.query;
    // let query = {};
    // query.question = question;

    const result = await Model.find({ question }).populate({
      path: "user",
      populate: {
        path: "profile",
      },
    }).sort({ _id: -1 })
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
    const result = await Model.findById(id).populate({
      path: "user",
      populate: {
        path: "profile",
      },
    });

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

exports.getByUser = async (req, res) => {
  try {
    const user = req.user;
    const result = await Model.find({ user: user?._id }).populate({
      path: "user",
      populate: {
        path: "profile",
      },
    });

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

    await Model.findByIdAndUpdate(
      id,
      { data },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "updated success",
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
