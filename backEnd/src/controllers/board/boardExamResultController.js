const Model = require("../../models/board/boardExamResultModel");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;

    const result = await Model.create(data);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Board exam add success",
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
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { subject, user } = req.query;

  try {
    let query = {};
    if (subject && subject !== "undefined" && subject !== null)
      query.subject = subject;
    query.user = user;

    const result = await Model.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("boardExam mcqs.mcq");

    const total = await Model.countDocuments(query).sort({ _id: -1 });
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Board Exam get success.",
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
    const result = await Model.findById(id).populate("boardExam mcqs.mcq");
    res.status(200).json({
      success: true,
      message: "Board Exam get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// exports.update = async (req, res) => {
//   const id = req?.params?.id;
//   const data = req?.body;

//   try {
//     const isExist = await Model.findById(id);

//     if (!isExist) {
//       return res.status(404).json({
//         success: false,
//         error: "Model Test not found",
//       });
//     }

//     const result = await Model.findByIdAndUpdate(id, data, {
//       new: true,
//     });

//     if (!result?._id) {
//       return res.status(404).json({
//         success: false,
//         error: "Model Test not updated",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Model Test updated success",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: "board Exam not found!",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "board Exam delete success",
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
