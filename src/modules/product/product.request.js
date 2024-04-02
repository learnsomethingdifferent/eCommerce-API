const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  currency: Joi.string(),
  stock: Joi.number(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  brand: Joi.string().required(),
  thumbnail: Joi.string(),
  images: Joi.array().items(Joi.string()),
  specifications: Joi.object({
    weight: Joi.string(),
    battery_life: Joi.string(),
    bluetooth_version: Joi.string(),
    noise_cancellation: Joi.string(),
    colors: Joi.array().items(Joi.string()),
  }),
  status: Joi.string().valid("active", "inactive").default("inactive"),
});

const productFilterSchema = Joi.object({
  brand: Joi.string(),
  colors: Joi.array().items(Joi.string()),
  price: Joi.object({
    min: Joi.number(),
    max: Joi.number(),
  }),
  date: Joi.string().valid("new", "old"),
  status: Joi.string().valid("active", "inactive"),
});

module.exports = {
  productSchema,
  productFilterSchema,
};
