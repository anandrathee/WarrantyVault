const express = require("express");
const {
  addProduct,
  getMyProducts,
  deleteProduct
} = require("../controllers/productController");

const upload = require("../middleware/uploadFile");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes
router.post("/", protect, upload.single("invoice"), addProduct);
router.get("/", protect, getMyProducts);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
