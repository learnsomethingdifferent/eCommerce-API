const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true, unique: true, minlength: 2 },
    slogan: { type: String, minlength: 10 },
    slug: { type: String, unique: true },
    status: { type: String, default: "inactive", enum: ["active", "inactive"] },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
