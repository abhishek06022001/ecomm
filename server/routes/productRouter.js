const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = require("express").Router();
router
  .route("/product")
  .post(auth, authAdmin, productController.createProduct)
  .get(productController.getProducts);
router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryController.deleteCategory) // Delete a category by ID
  .put(auth, authAdmin, categoryController.updateCategory);
module.exports = router;
