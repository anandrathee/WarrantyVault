const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { productName, brand, purchaseDate, warrantyPeriod, notes } = req.body;
    const invoiceUrl = req.file ? req.file.path : null;

    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + Number(warrantyPeriod));

    const newProduct = await Product.create({
      userId: req.user._id,
      productName,
      brand,
      purchaseDate,
      warrantyPeriod,
      expiryDate,
      invoiceUrl,
      notes
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: "Add product failed", err });
  }
};

// Get My Products
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id }).sort({ expiryDate: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed", err });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed", err });
  }
};
