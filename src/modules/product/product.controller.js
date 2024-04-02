const { handleError } = require("../../config/error.config");
const ProductService = require("./product.service");
const { productSchema, productFilterSchema } = require("./product.request");

class ProductController {
  async createProduct(req, res) {
    try {
      const { body } = req;
      const product = await ProductService.createProduct(body);
      res.json(product);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllProducts(req, res) {
    try {
      const { query } = req;
      const { error } = productFilterSchema.validate(query);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const products = await ProductService.getAllProducts(query);
      res.json(products);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.json(product);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await ProductService.updateProduct(id, body);
      res.json(product);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductService.deleteProduct(id);
      res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new ProductController();
