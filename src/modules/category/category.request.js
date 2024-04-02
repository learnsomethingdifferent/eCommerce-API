const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.any(),
  slug: Joi.string(),
});

const subcategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  category: Joi.string().required(),
  parent: Joi.string(),
  slug: Joi.string(),
}).options({ allowUnknown: true });

module.exports = {
  categorySchema,
  subcategorySchema,
};
