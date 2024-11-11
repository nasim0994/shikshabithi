const Model = require("../models/modelTestModel");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const newData = {
      ...data,
      chapter: data?.chapter ? data?.chapter : undefined,
      subject: data?.subject ? data?.subject : undefined,
    };

    const result = await Model.create(newData);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Model Test add success",
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.get = async (req, res) => {
  const { mainCategory, subject, chapter, status } = req.query;

  try {
    let query = {};
    if (status) {
      query.status = status;
    }
    if (mainCategory && mainCategory !== "undefined" && mainCategory !== null) {
      query.mainCategory = mainCategory;
    }

    if (subject && subject !== "undefined" && subject !== null) {
      query.subject = subject;
    }

    if (chapter && chapter !== "undefined" && chapter !== null) {
      query.chapter = chapter;
    }

    const result = await Model.find(query)
      .sort({ _id: -1 })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "subCategory",
        select: "name",
      })
      .populate({
        path: "subject",
        select: "name",
      })
      .populate({
        path: "chapter",
        select: "name",
      })
      .populate({
        path: "mcqs",
        select: "name",
      })
      .populate({
        path: "vendor",
        select: "profile",
        populate: {
          path: "profile",
          select: "name",
        },
      });

    res.status(200).json({
      success: true,
      message: "Model test get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;
  try {
    const result = await Model.findById(id)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "subCategory",
        select: "name",
      })
      .populate({
        path: "subject",
        select: "name",
      })
      .populate({
        path: "chapter",
        select: "name",
      })
      .populate({
        path: "mcqs",
        select: "name",
      })
      .populate({
        path: "vendor",
        select: "profile",
        populate: {
          path: "profile",
          select: "name",
        },
      });

    res.status(200).json({
      success: true,
      message: "Model Test get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Model Test not found",
      });
    }

    let newData = {
      ...data,
      chapter: data?.chapter ? data?.chapter : undefined,
      subject: data?.subject ? data?.subject : undefined,
    };

    const result = await Model.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result?._id) {
      return res.json({
        success: false,
        message: "Model Test not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Model Test updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req?.params;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Model Test not found!",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Model Test delete success",
        data: result,
      });
    } else {
      return res.json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.totalAddLength = async (req, res) => {
  const userId = req.user?._id;

  try {
    const result = await Model.countDocuments({ vendor: userId });
    res.status(200).json({
      success: true,
      message: "Total model test add by vendor",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Model Test not found",
      });
    }

    const result = await Model.findByIdAndUpdate(
      id,
      { status: isExist?.status == "active" ? "pending" : "active" },
      { new: true }
    );

    if (!result?._id) {
      return res.json({
        success: false,
        message: "Model Test not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Model Test updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
