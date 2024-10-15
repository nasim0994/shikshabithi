const Model = require("../../models/board/boardMCQModel");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const result = await Model.create(data);
    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Board MCQ add success",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error creating BoardMCQ", error });
  }
};

exports.get = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  const { cls, subject, board, tag, year } = req.query;
  try {
    let query = {};
    if (cls && cls != "undefined" && cls != "null") query.class = cls;
    if (subject && subject != "undefined" && subject != "null")
      query.subject = subject;
    if (board && board != "undefined" && board != "null") query.board = board;
    if (year && year != "undefined" && year != "null") query.year = year;
    if (tag && tag != "undefined" && tag != "null") query["tags"] = tag;

    const result = await Model.find(query)
      .skip(skip)
      .limit(limit)
      .populate("board class subject mcqs");

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Board MCQ get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const result = await Model.findById(req.params.id).populate(
      "board class subject mcqs"
    );
    if (!result) {
      return res.status(404).json({ message: "BoardMCQ not found" });
    }
    res.status(200).json({
      success: true,
      message: "get success",
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
  try {
    const result = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("board MCQ class subject mcqs");

    if (!result?._id) {
      return res.status(404).json({
        success: false,
        error: "not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: "not found!",
      });
    }
    const result = await Model.findByIdAndDelete(id);
    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "delete success",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
