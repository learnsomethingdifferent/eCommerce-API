const { Category, Subcategory } = require("./category");
const fs = require("fs");
const path = require("path");

class CategoryService {
  async createCategory(data, image) {
    const imageName = `category-${Date.now()}.jpg`;
    const imagePath = path.join(
      __dirname,
      `../../public/categories/${imageName}`
    );

    const category = new Category({
      ...data,
      image: `/public/categories/${imageName}`,
    });

    fs.writeFileSync(imagePath, image.buffer); // Use image.buffer

    return await category.save();
  }

  async createSubcategory(data) {
    const subcategory = new Subcategory(data);
    return await subcategory.save();
  }

  async getAllCategories() {
    return await Category.find().populate("subcategories");
  }

  async getCategoryById(id) {
    return await Category.findById(id).populate("subcategories");
  }

  async updateCategory(id, data) {
    const category = await Category.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    Object.assign(category, data);

    return await category.save();
  }

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }

  async getAllSubcategories() {
    return await Subcategory.find().populate("category").populate("parent");
  }

  async getSubcategoryById(id) {
    return await Subcategory.findById(id)
      .populate("category")
      .populate("parent");
  }

  async updateSubcategory(id, data) {
    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      throw new Error("Subcategory not found");
    }

    Object.assign(subcategory, data);

    return await subcategory.save();
  }

  async deleteSubcategory(id) {
    return await Subcategory.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
