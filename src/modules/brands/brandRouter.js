const express = require("express");
const router = express.Router();
const multer = require("multer");
const BrandController = require("./brandController");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");

const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/brand/";
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
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.single("image"),
  ValidatorMiddleware.validateBody(
    require("./brandRequest").brandSchema
  ),
  BrandController.createBrand
);

router.get(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BrandController.getAllBrands
);

router.get(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BrandController.getBrandById
);

router.put(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.single("image"),
  BrandController.updateBrand
);

router.delete(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  BrandController.deleteBrand
);

module.exports = router;
