const Category = require("../models/categoryModel");
const categoryController = {
  getCategory: async (req, res) => {
    const categories = await Category.find();
    return res.status(200).json({
      status: "success",
      result: categories.length,
      categories: categories,
    });
  },
  createCategory: async (req, res) => {
    const { name } = req.body;
    const category = await Category.findOne({ name });
  
    if (category)
      return res.status(400).json({ msg: "category already exists" });
    const new_category = new Category({ name });
    new_category.save();
    return res.status(200).json({ msg: "New Category Created" });
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).json({ msg: "deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      return res.status(200).json({ msg: "Updated bro" });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  },
};
module.exports = categoryController;
