const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productName: String,
  brand: String,
  purchaseDate: Date,
  warrantyPeriod: Number,
  expiryDate: Date,
  invoiceUrl: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
