const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/categories/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `category-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.single("image"),
  ValidatorMiddleware.validateBody(
    require("./category.request").categorySchema
  ),
  CategoryController.createCategory
);

router.post(
  "/subcategory/create",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ValidatorMiddleware.validateBody(
    require("./category.request").subcategorySchema
  ),
  CategoryController.createSubcategory
);

router.get(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.getAllCategories
);

router.get(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.getCategoryById
);

router.put(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ValidatorMiddleware.validateBody(
    require("./category.request").categorySchema
  ),
  CategoryController.updateCategory
);

router.delete(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.deleteCategory
);

router.get(
  "/subcategories",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.getAllSubcategories
);

router.get(
  "/subcategory/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.getSubcategoryById
);

router.put(
  "/subcategory/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ValidatorMiddleware.validateBody(
    require("./category.request").subcategorySchema
  ),
  CategoryController.updateSubcategory
);

router.delete(
  "/subcategory/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  CategoryController.deleteSubcategory
);

module.exports = router;
