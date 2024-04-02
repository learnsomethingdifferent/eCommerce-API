const { handleError } = require("../../config/error.config");
const BrandService = require("./brandService");

class BrandController {
  async createBrand(req, res) {
    try {
      const { name, slogan, status } = req.body;
      const image = req.file ? req.file.filename : null;
      const brand = await BrandService.createBrand(image, name, slogan, status);
      res.json(brand);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAllBrands();
      res.json(brands);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getBrandById(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getBrandById(id);
      res.json(brand);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const newImage = req.file ? req.file.filename : null;
      const brand = await BrandService.updateBrand(id, data, newImage);
      res.json(brand);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const deletedBrand  = await BrandService.deleteBrand(id);
      res.json({ message: "Brand deleted successfully", deletedBrand });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BrandController();
