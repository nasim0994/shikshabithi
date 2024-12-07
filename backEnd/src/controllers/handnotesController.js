const Model = require("../models/handnotesModel");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

const PDFDocument = require("pdfkit");

exports.add = async (req, res) => {
  const images = req?.files?.map((file) => file.filename);

  if (images?.length < 1) {
    return res.json({
      success: false,
      error: "Please upload at least one image",
    });
  }

  try {
    const data = req?.body;
    const info = {
      ...data,
      images,
      tags: data?.tags ? JSON.parse(data?.tags) : [],
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

    if (images.length > 0) {
      images.forEach((imagePath) => {
        const fullPath = `./uploads/handnotes/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

exports.get = async (req, res) => {
  try {
    const paginationOptions = pick(req.query, ["page", "limit"]);
    const { page, limit, skip } = calculatePagination(paginationOptions);
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
      .populate({
        path: "tags",
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (error) {
    res.json({
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
      })
      .populate({
        path: "tags",
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
    res.json({
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
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const images = req?.files?.map((file) => file.filename);

  try {
    const id = req?.params?.id;

    const isExist = await Model.findById(id);
    if (!isExist) {
      images?.forEach((imagePath) => {
        const fullPath = `./uploads/handnotes/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      return res.status(404).json({
        success: false,
        error: "not found",
      });
    }

    const data = req.body;
    const newData = {
      ...data,
      tags: data?.tags ? JSON.parse(data?.tags) : [],
      subject: data?.subject ? data?.subject : undefined,
      chapter: data?.chapter ? data?.chapter : undefined,
      images: images?.length > 0 ? images : isExist?.images,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "updated success",
    });

    if (result && images.length > 0) {
      isExist?.images?.forEach((imagePath) => {
        const fullPath = `./uploads/handnotes/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    if (images.length > 0) {
      images.forEach((imagePath) => {
        const fullPath = `./uploads/handnotes/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
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

    const result = await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete success",
      data: result,
    });

    if (result?._id) {
      const imagePaths = isExist?.images;
      imagePaths.forEach((imagePath) => {
        const fullPath = `./uploads/handnotes/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
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
    const handNote = await Model.findById(id);

    if (!handNote) {
      return res.status(404).json({
        success: false,
        error: "Hand Note not found",
      });
    }

    const newStatus = handNote.status === "active" ? "pending" : "active";

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

exports.download = async (req, res) => {
  const id = req?.params?.id;
  const userId = req?.user?._id;

  try {
    const handNote = await Model.findById(id);

    if (!handNote) {
      return res.json({
        success: false,
        message: "Hand Note not found",
      });
    }

    const pdf = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${handNote?.title}.pdf`
    );

    pdf.pipe(res);

    pdf.fontSize(20).text(handNote?.title, {
      align: "center",
      margin: 20,
    });

    handNote?.images?.forEach((image, index) => {
      pdf.image(`./uploads/handnotes/${image}`, {
        width: 400,
        align: "center",
        valign: "center",
      });

      if (index < handNote.images.length - 1) {
        pdf.addPage();
      }
    });

    pdf.end();

    res.status(200);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
