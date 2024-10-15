const Content = require("../../models/academy/content.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const newData = {
      ...data,
      subChapter: data?.subChapter ? data?.subChapter : undefined,
      subSubChapter: data?.subSubChapter ? data?.subSubChapter : undefined,
    };
    const result = await Content.create(newData);

    res.status(200).json({
      success: true,
      message: "Content add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const { category, cls, subject, chapter, subChapter, subSubChapter } =
    req.query;

  try {
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;
    if (cls && cls != "undefined" && cls != "null") query.class = cls;
    if (subject && subject != "undefined" && subject != "null")
      query.subject = subject;
    if (chapter && chapter != "undefined" && chapter != "null")
      query.chapter = chapter;
    if (subChapter && subChapter != "undefined" && subChapter != "null")
      query.subChapter = subChapter;
    if (
      subSubChapter &&
      subSubChapter != "undefined" &&
      subSubChapter != "null"
    )
      query.subSubChapter = subSubChapter;

    const result = await Content.find(query).populate(
      "category class subject chapter subChapter subSubChapter"
    );

    res.status(200).json({
      success: true,
      message: "Contents get success",
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
  const { id } = req.params;
  try {
    const result = await Content.findById(id).populate(
      "category class subject chapter"
    );
    res.status(200).json({
      success: true,
      message: "Content get success",
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
    const isExist = await Content.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    const result = await Content.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Content not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content updated success",
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
    const result = await Content.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Content delete problem!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content delete success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
