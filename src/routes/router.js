const express = require("express");
const authRouter = require("../modules/auth/auth.router");
const userRouter = require("../modules/user/user.router");
const bannerRouter = require("../modules/banner/banner.router");
const brandRouter = require("../modules/brands/brandRouter");
const productRouter = require("../modules/product/product.router");
const categoryRouter = require("../modules/category/category.router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
