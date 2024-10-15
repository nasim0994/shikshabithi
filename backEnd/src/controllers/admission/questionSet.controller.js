const QuestionSet = require("../../models/admission/questionSet.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const result = await QuestionSet.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "QuestionSet add success",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const { university, year } = req.query;
  try {
    let query = {};

    if (
      university &&
      university !== "undefined" &&
      university !== "null" &&
      university !== "All"
    ) {
      query.university = university;
    }

    if (year && year !== "undefined" && year !== "null" && year !== "All") {
      query.year = year;
    }

    const result = await QuestionSet.find(query).populate("university");

    res.status(200).json({
      success: true,
      message: "QuestionSet get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;
  try {
    const result = await QuestionSet.findById(id).populate("university");
    res.status(200).json({
      success: true,
      message: "QuestionSet get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await QuestionSet.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "QuestionSet not found",
      });
    }

    const result = await QuestionSet.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result?._id) {
      return res.status(404).json({
        success: false,
        error: "QuestionSet not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "QuestionSet updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destoy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await QuestionSet.findById(id);

    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: "QuestionSet not found!",
      });
    }

    const result = await QuestionSet.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "QuestionSet delete success",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "something went wront!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
