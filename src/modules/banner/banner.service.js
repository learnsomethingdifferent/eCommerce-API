const Banner = require("../banner/banner");

class BannerService {
  async createBanner(images, url, title, status) {
    const banner = new Banner({
      images,
      url,
      title,
      status,
    });
    return await banner.save();
  }

  async getAllBanners() {
    return await Banner.find();
  }

  async getBannerById(id) {
    return await Banner.findById(id);
  }

  async updateBanner(id, data, newImages) {
    let banner = await Banner.findById(id);

    if (!banner) {
      throw new Error("Banner not found");
    }

    banner.url = data.url || banner.url;
    banner.title = data.title || banner.title;
    banner.status = data.status || banner.status;

    if (newImages && newImages.length > 0) {
      banner.images.push(...newImages);
    }

    return await banner.save();
  }

  async deleteBanner(id) {
    return await Banner.findByIdAndDelete(id);
  }
}

module.exports = new BannerService();
