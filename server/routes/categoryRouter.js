const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = require("express").Router();
router
  .route("/category")
  .post(auth, authAdmin, categoryController.createCategory)
  .get(categoryController.getCategory);
router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryController.deleteCategory) // Delete a category by ID
  .put(auth, authAdmin, categoryController.updateCategory);
module.exports = router;
