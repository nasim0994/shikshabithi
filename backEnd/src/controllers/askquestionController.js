const fs = require("fs");
const Model = require("../models/askquestionModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;
    const info = {
      ...data,
      image,
      subject: data?.subject ? data?.subject : undefined,
      chapter: data?.chapter ? data?.chapter : undefined,
    };

    const result = await Model.create(info);

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

    fs.unlink(`./uploads/askQuestion/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { subject, category, status } = req.query;

    let query = {};
    if (category && category !== "undefined" && category !== null)
      query.category = category;
    if (subject && subject !== "undefined" && subject !== null)
      query.subject = subject;
    if (status && status !== "undefined" && status !== null)
      query.status = status;

    const result = await Model.find(query)
      .populate({
        path: "user",
        populate: {
          path: "profile",
        },
      })
      .populate({
        path: "subject",
        populate: {
          path: "class",
        },
      })
      .populate({
        path: "chapter",
      })
      .sort({ createdAt: -1 });

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
    const result = await Model.findById(id)
      .populate({
        path: "user",
        populate: {
          path: "profile",
        },
      })
      .populate({
        path: "subject",
        populate: {
          path: "class",
        },
      })
      .populate({
        path: "chapter",
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
    const result = await Model.find({ user: user?._id })
      .populate({
        path: "user",
        populate: {
          path: "profile",
        },
      })
      .populate({
        path: "subject",
        populate: {
          path: "class",
        },
      })
      .populate({
        path: "chapter",
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
  const image = req?.file?.filename;

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

    if (image) {
      fs.unlink(`./uploads/askQuestion/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Model.findByIdAndUpdate(
        id,
        {
          ...data,
          image,
          subject: data?.subject ? data?.subject : undefined,
          chapter: data?.chapter ? data?.chapter : undefined,
        },
        {
          new: true,
        }
      );
    } else {
      await Model.findByIdAndUpdate(
        id,
        {
          ...data,
          image: isExist?.image,
          subject: data?.subject ? data?.subject : undefined,
          chapter: data?.chapter ? data?.chapter : undefined,
        },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/askQuestion/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
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

      if (result?._id) {
        fs.unlink(`./uploads/askQuestion/${isExist?.image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

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

exports.toggleStatus = async (req, res) => {
  const id = req?.params?.id;

  try {
    const question = await Model.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    const newStatus = question.status === "active" ? "pending" : "active";

    await Model.findByIdAndUpdate(id, { status: newStatus }, { new: true });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: { id, status: newStatus },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAskQuestionLengthByUser = async (req, res) => {
  try {
    const user = req.user;
    const result = await Model.find({ user: user?._id }).countDocuments();

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
