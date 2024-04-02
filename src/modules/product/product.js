const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    brand: { type: String, required: true },
    thumbnail: { type: String },
    images: [{ type: String }],
    specifications: {
      weight: { type: String },
      battery_life: { type: String },
      bluetooth_version: { type: String },
      noise_cancellation: { type: String },
      colors: [{ type: String }],
    },
    status: { type: String, default: "inactive", enum: ["active", "inactive"] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
