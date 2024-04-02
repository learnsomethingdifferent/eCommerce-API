const Product = require("./product");

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(query) {
    const {
      page = 1,
      limit = 10,
      sort,
      brand,
      colors,
      price,
      date,
      status = "inactive",
    } = query;

    const filters = {
      ...(brand && { brand }),
      ...(colors && { "specifications.colors": { $in: colors } }),
      ...(price && {
        price: {
          $gte: price.min || 0,
          $lte: price.max || Infinity,
        },
      }),
      ...(date === "new"
        ? {
            createdAt: {
              $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
            },
          }
        : date === "old"
        ? {
            createdAt: { $lt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
          }
        : {}),
      status,
    };

    const products = await Product.find(filters)
      .sort(sort ? { category: sort } : {})
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return products;
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, data) {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    Object.assign(product, data);

    return await product.save();
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
