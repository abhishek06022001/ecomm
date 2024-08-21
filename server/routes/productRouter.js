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
  .delete(auth, authAdmin, productController.deleteProduct)
  .put(auth, authAdmin, productController.updateProduct);
module.exports = router;
