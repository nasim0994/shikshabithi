const AdmissionMCQ = require("../../models/admission/admissionMCQ.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const result = await AdmissionMCQ.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "AdmissionMCQ add success",
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
  const { university, set } = req.query;
  try {
    let query = {};
    if (university && university !== "undefined" && university !== null)
      query.university = university;
    if (set && set !== "undefined" && set !== null) query.questionSet = set;

    const result = await AdmissionMCQ.find(query).populate(
      "university questionSet subjects.subject subjects.mcqs"
    );

    res.status(200).json({
      success: true,
      message: "AdmissionMCQ get success",
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
    const result = await AdmissionMCQ.findById(id).populate(
      "university questionSet subjects.subject subjects.mcqs"
    );
    res.status(200).json({
      success: true,
      message: "AdmissionMCQ get success",
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
    const isExist = await AdmissionMCQ.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "AdmissionMCQ not found",
      });
    }

    const result = await AdmissionMCQ.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result?._id) {
      return res.status(404).json({
        success: false,
        error: "AdmissionMCQ not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "AdmissionMCQ updated success",
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
    const isExist = await AdmissionMCQ.findById(id);

    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: "AdmissionMCQ not found!",
      });
    }

    const result = await AdmissionMCQ.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "AdmissionMCQ delete success",
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
