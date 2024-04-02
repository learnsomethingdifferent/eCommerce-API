const { handleError } = require("../../config/error.config");
const CategoryService = require("./category.service");
const Joi = require("joi");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, description, slug } = req.body;
      const image = req.file; // Get the file object
      const category = await CategoryService.createCategory(
        { name, description, slug },
        image
      );

      res.json(category);
    } catch (error) {
      handleError(error, res);
    }
  }

  async createSubcategory(req, res) {
    try {
      const data = req.body;
      const subcategory = await CategoryService.createSubcategory(data);
      res.json(subcategory);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      res.json(category);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const category = await CategoryService.updateCategory(id, data);
      res.json(category);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllSubcategories(req, res) {
    try {
      const subcategories = await CategoryService.getAllSubcategories();
      res.json(subcategories);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getSubcategoryById(req, res) {
    try {
      const { id } = req.params;
      const subcategory = await CategoryService.getSubcategoryById(id);
      res.json(subcategory);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateSubcategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const subcategory = await CategoryService.updateSubcategory(id, data);
      res.json(subcategory);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteSubcategory(req, res) {
    try {
      const { id } = req.params;
      await CategoryService.deleteSubcategory(id);
      res.json({ message: "Subcategory deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new CategoryController();
