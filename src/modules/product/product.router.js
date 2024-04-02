const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("./product.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");

const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/products/";
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
  upload.none(),
  ValidatorMiddleware.validateBody(require("./product.request").productSchema),
  ProductController.createProduct
);

router.get(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ProductController.getAllProducts
);

router.get(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ProductController.getProductById
);

router.put(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.none(),
  ProductController.updateProduct
);

router.delete(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ProductController.deleteProduct
);

module.exports = router;
