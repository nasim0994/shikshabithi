const Chapter = require("../../models/academy/subChapter.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const result = await Chapter.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Sub Chapter add success",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "something went wront!",
        data: result,
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
  const { category, cls, subject, chapter } = req.query;
  try {
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;
    if (cls && cls != "undefined" && cls != "null") query.class = cls;
    if (subject && subject != "undefined" && subject != "null")
      query.subject = subject;
    if (chapter && chapter != "undefined" && chapter != "null")
      query.chapter = chapter;

    const result = await Chapter.find(query).populate(
      "category class subject chapter"
    );
    res.status(200).json({
      success: true,
      message: "Sub Chapters get success",
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
  const id = req.params.id;
  try {
    const result = await Chapter.findById(id).populate(
      "category class subject chapter"
    );
    res.status(200).json({
      success: true,
      message: "Chapter get success",
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
    const isExist = await Chapter.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Sub Chapter not found",
      });
    }

    const result = await Chapter.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Sub Chapter not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sub Chapter updated success",
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
    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return res.status(400).json({
        success: false,
        error: "Sub chapter not found!",
      });
    }

    const result = await Chapter.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Sub Chapter delete success",
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
