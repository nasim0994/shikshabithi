const Model = require("../models/blogsModel");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;

    const info = {
      ...data,
      image,
      tags: JSON.parse(data?.tags),
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

    fs.unlink(`./uploads/blogs/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const paginationOptions = pick(req.query, ["page", "limit"]);
    const { page, limit, skip } = calculatePagination(paginationOptions);
    const { subject, category, status, chapter, tag } = req.query;

    let query = {};
    if (category && category !== "undefined" && category !== null)
      query.category = category;
    if (
      subject &&
      subject !== "all" &&
      subject !== "undefined" &&
      subject !== null
    )
      query.subject = subject;
    if (chapter && chapter !== "undefined" && chapter !== null)
      query.chapter = chapter;

    if (status && status !== "undefined" && status !== null)
      query.status = status;

    if (tag && tag != "undefined" && tag != "null") query["tags"] = tag;

    const result = await Model.find(query)
      .populate({
        path: "user",
        select: "profile package",
        populate: {
          path: "profile",
          select: "name image",
        },
      })
      .populate({
        path: "subject",
        select: "name class",
        populate: {
          path: "class",
          select: "name",
        },
      })
      .populate({
        path: "chapter",
        select: "name",
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
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getByViewers = async (req, res) => {
  try {
    const paginationOptions = pick(req.query, ["page", "limit"]);
    let { page, limit, skip } = calculatePagination(paginationOptions);

    // Ensure page, limit, and skip are integers
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    skip = parseInt(skip, 10) || 0;

    const { subject, category, status } = req.query;

    let query = {};
    if (category && category !== "undefined" && category !== null)
      query.category = category;
    if (subject && subject !== "undefined" && subject !== null)
      query.subject = subject;
    if (status && status !== "undefined" && status !== null)
      query.status = status;

    const result = await Model.aggregate([
      { $match: query },
      {
        $addFields: {
          viewersCount: {
            $cond: {
              if: { $isArray: "$viewers" },
              then: { $size: "$viewers" },
              else: 0,
            },
          },
        },
      },
      { $sort: { viewersCount: -1 } }, // Sort by viewersCount in descending order
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $lookup: {
          from: "chapters",
          localField: "chapter",
          foreignField: "_id",
          as: "chapter",
        },
      },
    ]);

    const total = await Model.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / limit);

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
      fs.unlink(`./uploads/blogs/${isExist?.image}`, (err) => {
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

    fs.unlink(`./uploads/blogs/${image}`, (err) => {
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
        fs.unlink(`./uploads/blogs/${isExist?.image}`, (err) => {
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
    const blog = await Model.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    const newStatus = blog.status === "active" ? "pending" : "active";

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

exports.addBlogView = async (req, res) => {
  const { blogId } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const blog = await Model.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingView = blog.viewers.find((viewer) => viewer.user === ip);
    if (existingView) {
      return res.status(200).json({ message: "View already counted" });
    }
    blog.viewers.push({ user: ip });
    await blog.save();

    res.status(201).json({ message: "View added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add view", error });
  }
};

exports.toggleIsHome = async (req, res) => {
  const id = req?.params?.id;

  try {
    const blog = await Model.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    const newStatus = !blog.isHome;

    await Model.findByIdAndUpdate(id, { isHome: newStatus }, { new: true });

    res.status(200).json({
      success: true,
      message: "Home status updated successfully",
      data: { id, isHome: newStatus },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

exports.getHomeBlogs = async (req, res) => {
  try {
    const result = await Model.find({ isHome: true, status: "active" })
      .populate({
        path: "user",
        select: "profile package",
        populate: {
          path: "profile",
          select: "name image",
        },
      })
      .populate({
        path: "subject",
        select: "name class",
        populate: {
          path: "class",
          select: "name",
        },
      })
      .populate({
        path: "chapter",
        select: "name",
      })
      .populate({
        path: "tags",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "get success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
