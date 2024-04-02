const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
