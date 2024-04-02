const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");
const upload = require("../../middleware/uploader.middlewaer");
const userController = require("./user.controller");

router.post(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  upload.single("image"),
  ValidatorMiddleware.validateBody(
    require("../auth/auth.request").registerSchema
  ),
  UserController.createUser
);

router.get(
  "/activate/:activationToken",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  userController.activate
);

router.get(
  "/",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  UserController.getUsers
);

router.get(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  UserController.getUserById
);

router.put(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  UserController.updateUser
);

router.delete(
  "/:id",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  UserController.deleteUser
);

router.post(
  "/forgot-password",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ValidatorMiddleware.validateBody(
    require("../auth/auth.request").forgotPasswordSchema
  ),
  UserController.forgotPassword
);

router.post(
  "/set-new-password",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  ValidatorMiddleware.validateBody(
    require("../auth/auth.request").setNewPasswordSchema
  ),
  UserController.setNewPassword
);

module.exports = router;
