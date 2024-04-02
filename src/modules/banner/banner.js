const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    images: [{ type: String }],
    url: { type: String, required: true },
    title: { type: String, minlength: 20 },
    status: { type: String, default: "inactive" },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
