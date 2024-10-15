const Class = require("../../models/academy/class.model");

exports.insert = async (req, res) => {
  try {
    const data = req?.body;
    const cls = await Class.find({});

    let uuid = "";
    if (cls?.length > 0) {
      cls?.map((c) => {
        uuid = Math.max(parseInt(c?.uuid)) + 1;
      });
    } else {
      uuid = 200;
    }

    const newData = {
      ...data,
      fixed: false,
      uuid,
    };

    const result = await Class.create(newData);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Class add success",
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
  const { category } = req.query;
  try {
    let query = {};
    if (category && category != "undefined" && category != "null") {
      query.category = category;
    }

    const result = await Class.find(query).populate("category").sort("order");

    res.status(200).json({
      success: true,
      message: "Classes get success",
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
    const result = await Class.findById(id).populate("category");
    res.status(200).json({
      success: true,
      message: "Class get success",
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
    const isExist = await Class.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Class not found",
      });
    }

    const result = await Class.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Class not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated success",
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
    const clas = await Class.findById(id);

    if (!clas) {
      return res.status(400).json({
        success: false,
        error: "class not found!",
      });
    }

    const category = clas?.category;

    const result = await Class.findByIdAndDelete(id);

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Class delete success",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "something went wront!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
