const Product = require("../models/productModel");
const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, categoryId, price, image } = req.body;
      const newProduct = new Product({
        name,
        categoryId,
        price,
        image,
      });
      await newProduct.save();
      return res.status(200).json({msg:"Created a new Product"});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
    } catch (error) {}
  },
  updateProduct: async (req, res) => {
    try {
    } catch (error) {}
  },
};
module.exports = productController;
