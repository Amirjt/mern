const express = require("express");

const router = express.Router();

const adminAuth = require("../middlewares/admin.middleware");

const {
  addNewProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/products.controller");

router.post("/", adminAuth, addNewProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);
router.delete("/:id", adminAuth, deleteProduct);
router.patch("/:id", adminAuth, editProduct);

module.exports = router;
