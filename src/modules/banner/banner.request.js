const Joi = require("joi");

const bannerSchema = Joi.object({
  images: Joi.array().items(Joi.string()),
  url: Joi.string().required(),
  title: Joi.string().min(20),
  status: Joi.string().valid("active", "inactive").default("inactive"),
});

module.exports = {
  bannerSchema,
};
