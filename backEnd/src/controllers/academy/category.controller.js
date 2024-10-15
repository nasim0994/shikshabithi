const AcademyCategory = require("../../models/academy/category.model");

exports.insert = async (req, res) => {
  const data = req?.body;
  try {
    const newData = {
      ...data,
      fixed: false,
      uuid: 100 + data?.order,
    };
    const result = await AcademyCategory.create(newData);

    res.status(200).json({
      success: true,
      message: "Categories add success",
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
  try {
    const result = await AcademyCategory.find({}).sort("order")
    res.status(200).json({
      success: true,
      message: "Categories get success",
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
    const result = await AcademyCategory.findById(id);
    res.status(200).json({
      success: true,
      message: "Category get success",
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
    const isExist = await AcademyCategory.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    const result = await AcademyCategory.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Category not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated success",
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
    const result = await AcademyCategory.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Category delete problem!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category delete success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
