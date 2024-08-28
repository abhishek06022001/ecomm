const Product = require("../models/productModel");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const arr = { ...this.queryString };
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((element) => delete arr[element]);
    let queryStr = JSON.stringify(arr);
    queryStr = queryStr.replace(
      /(lte|gte|gt|lt|regex)/g,
      (match) => "$" + match
    );

    let somejson = JSON.parse(queryStr);
    this.query = this.query.find(somejson);
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const queryArr = this.queryString.sort.split(",");
      let queryObj = {};
      queryArr.forEach((element) => {
        if (element.startsWith("-")) {
          const negelement = element.substring(1);

          queryObj = { ...queryObj, [negelement]: -1 };
        } else {
          queryObj = { ...queryObj, [element]: 1 };
        }
      });
      this.query = this.query.sort(queryObj);
    } else {
      this.query = this.query.sort({ createdAt: 1 });
    }
    return this;
  }
  pagination() {
    const limit = this.queryString.limit || 9;
    const page = this.queryString.page || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Product, req.query)
        .filtering()
        .sorting()
        .pagination();
      const products = await features.query;
      return res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, categoryId, price, image, product_id } = req.body;
      const newProduct = new Product({
        product_id,
        name,
        categoryId,
        price,
        image,
      });
      const product = await Product.findOne({ product_id });
      if (!image) return res.status(400).json({ msg: "No Image Upload" });
      if (product)
        return res.status(400).json({ msg: "Product aleady exists" });
      const savedProduct = await newProduct.save();
      return res
        .status(200)
        .json({ msg: "Created a new Product", product: savedProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete({ _id: req.params.id });
      return res.json({ msg: "Product Deleted" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      await Product.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });
      return res.status(200).json({ msg: "Product Updated SuccessFully" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};
module.exports = productController;
