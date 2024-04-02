const AuthService = require("./auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body, req.file);
      res.status(201).json({ status: "success", data: user });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const { activationToken } = req.params;
      const result = await AuthService.activateUser(activationToken);
      res.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await AuthService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async dashboard(req, res, next) {
    try {
      const user = await AuthService.getDashboardDetails(req.user.id);
      res.status(200).json({
        message: "Dashboard accessed successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminDashboard(req, res, next) {
    try {
      const users = await AuthService.adminDashboard();
      res.json({
        status: "success",
        message: "Admin dashboard details fetched successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async setNewPassword(req, res, next) {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;
      const result = await AuthService.setNewPassword(
        email,
        otp,
        newPassword,
        confirmPassword
      );
      res.status(200).json({ status: "success", message: result.message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
