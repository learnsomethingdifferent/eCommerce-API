const Brand = require("./brand.model");

class BrandService {
  async createBrand(image, name, slogan, status) {
    const slug = this.generateSlug(name);
    const brand = new Brand({
      image,
      name,
      slogan,
      slug,
      status,
    });
    return await brand.save();
  }

  async getAllBrands() {
    return await Brand.find();
  }

  async getBrandById(id) {
    return await Brand.findById(id);
  }

  async updateBrand(id, data, newImage) {
    let brand = await Brand.findById(id);

    if (!brand) {
      throw new Error("Brand not found");
    }

    brand.image = newImage || brand.image;
    brand.name = data.name || brand.name;
    brand.slogan = data.slogan || brand.slogan;
    brand.status = data.status || brand.status;

    if (data.name) {
      brand.slug = this.generateSlug(data.name);
    }

    return await brand.save();
  }

  async deleteBrand(id) {
    return await Brand.findByIdAndDelete(id);
  }

  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
}

module.exports = new BrandService();
