const University = require("../../models/admission/university.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const result = await University.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "University add success",
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
  try {
    const result = await University.find({});

    res.status(200).json({
      success: true,
      message: "Universitys get success",
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
    const result = await University.findById(id);
    res.status(200).json({
      success: true,
      message: "University get success",
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
    const isExist = await University.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "University not found",
      });
    }

    const result = await University.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result?._id) {
      return res.status(404).json({
        success: false,
        error: "University not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "University updated success",
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
    const university = await University.findById(id);

    if (!university) {
      return res.status(400).json({
        success: false,
        error: "University not found!",
      });
    }

    const result = await University.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "University delete success",
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
