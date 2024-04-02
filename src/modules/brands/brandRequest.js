const Joi = require("joi");

const brandSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string().required().min(2),
  slogan: Joi.string().min(10),
  slug: Joi.string(),
  status: Joi.string().valid("active", "inactive").default("inactive"),
});

module.exports = {
  brandSchema,
};
