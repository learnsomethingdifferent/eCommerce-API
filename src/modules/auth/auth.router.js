const express = require("express");
const AuthController = require("./auth.controller");
const ValidatorMiddleware = require("../../middleware/velidator.middleware");
const AuthMiddleware = require("../../middleware/auth.middleware");
const upload = require("../../middleware/uploader.middlewaer");

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  ValidatorMiddleware.validateBody(require("./auth.request").registerSchema),
  AuthController.register
);

router.get("/activate/:activationToken", AuthController.activate);

router.post(
  "/login",
  ValidatorMiddleware.validateBody(require("./auth.request").loginSchema),
  AuthController.login
);

router.get(
  "/dashboard",
  AuthMiddleware.authenticateJWT,
  AuthController.dashboard
);


router.post(
  "/forgot-password",
  ValidatorMiddleware.validateBody(require("./auth.request").forgotPasswordSchema),
  AuthController.forgotPassword
);

router.post(
  "/set-new-password",
  ValidatorMiddleware.validateBody(
    require("./auth.request").setNewPasswordSchema
  ),
  AuthController.setNewPassword
);

router.get(
  "/admin",
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorize("admin"),
  AuthController.adminDashboard
);


module.exports = router;
