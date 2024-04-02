const { handleError } = require("../../config/error.config");
const BannerService = require("./banner.service");

class BannerController {
  async createBanner(req, res) {
    try {
      const { url, title, status } = req.body;
      const images = req.files.map((file) => file.filename);
      const banner = await BannerService.createBanner(
        images,
        url,
        title,
        status
      );
      res.json(banner);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllBanners(req, res) {
    try {
      const banners = await BannerService.getAllBanners();
      res.json(banners);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getBannerById(req, res) {
    try {
      const { id } = req.params;
      const banner = await BannerService.getBannerById(id);
      res.json(banner);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateBanner(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const newImages = req.files.map((file) => file.filename);
      const banner = await BannerService.updateBanner(id, data, newImages);
      res.json(banner);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteBanner(req, res) {
    try {
      const { id } = req.params;
      await BannerService.deleteBanner(id);
      res.json({ message: "Banner deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BannerController();
