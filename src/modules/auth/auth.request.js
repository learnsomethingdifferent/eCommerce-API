const Joi = require("joi");

class AuthRequest {
  registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.string().valid("seller", "customer", "admin").required(),
    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: Joi.string().required(),
  });

  get loginSchema() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  get setNewPasswordSchema() {
    return Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().length(4).required(),
      newPassword: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .required(),
      confirmPassword: Joi.ref("newPassword"),
    });
  }


}

module.exports = new AuthRequest();
