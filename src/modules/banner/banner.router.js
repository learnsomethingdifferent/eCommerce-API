const express = require("express");
const router = express.Router();
const multer = require("multer");
const BannerController = require("./banner.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");

const fs = require("fs");
const authMiddleware = require("../../middleware/auth.middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/banner/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  authMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.array("images", 5),
  ValidatorMiddleware.validateBody(
    require("../banner/banner.request").bannerSchema
  ),
  BannerController.createBanner
);

router.get(
  "/",
  authMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BannerController.getAllBanners
);

router.get(
  "/:id",
  authMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BannerController.getBannerById
);

router.put(
  "/:id",
  authMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.array("images", 5),
  BannerController.updateBanner
);
router.delete(
  "/:id",
  authMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BannerController.deleteBanner
);

module.exports = router;
