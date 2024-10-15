const AcademyMCQ = require("../../models/academy/mcq.model");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");

exports.insert = async (req, res) => {
  const data = req?.body;
  try {
    const newData = {
      ...data,
      subject: data?.subject ? data?.subject : undefined,
      chapter: data?.chapter ? data?.chapter : undefined,
      subChapter: data?.subChapter ? data?.subChapter : undefined,
      subSubChapter: data?.subSubChapter ? data?.subSubChapter : undefined,
    };

    const result = await AcademyMCQ.create(newData);

    res.status(200).json({
      success: true,
      message: "Academy MCQ add success",
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
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const {
    category,
    cls,
    subject,
    chapter,
    subChapter,
    subSubChapter,
    set,
    tag,
    jobSets,
  } = req.query;

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

    if (set && set != "undefined" && set != "null") query["sets"] = set;
    if (jobSets && jobSets != "undefined" && jobSets != "null")
      query["jobSets"] = jobSets;
    if (tag && tag != "undefined" && tag != "null") query["tags"] = tag;

    const result = await AcademyMCQ.find(query)
      .skip(skip)
      .limit(limit)
      .populate(
        "category class subject chapter subChapter subSubChapter tags sets"
      ).sort({ _id: -1 });

    const total = await AcademyMCQ.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Academy MCQ get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
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
    const result = await AcademyMCQ.findById(id).populate("tags sets");
    res.status(200).json({
      success: true,
      message: "Academy MCQ get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getMulti = async (req, res) => {
  const id = req?.params?.id;
  try {
    var result = await AcademyMCQ.find({
      _id: JSON.parse(id),
    });

    res.status(200).json({
      success: true,
      message: "Academy MCQ get success",
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
    const isExist = await AcademyMCQ.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Academy MCQ not found",
      });
    }

    const result = await AcademyMCQ.findByIdAndUpdate(
      id,
      {
        ...data,
        subject: data?.subject ? data?.subject : undefined,
        chapter: data?.chapter ? data?.chapter : undefined,
      },
      {
        new: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Academy MCQ not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Academy MCQ updated success",
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
    const result = await AcademyMCQ.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Academy MCQ delete problem!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Academy MCQ delete success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
