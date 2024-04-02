const userService = require("./user.service");
const UserService = require("./user.service");

class UserController {
  async createUser(req, res, next) {
    try {
      const result = await UserService.createUser(req.body, req.file);
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const { activationToken } = req.params;
      const result = await userService.activateUser(activationToken);
      res.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await UserService.getUsers();
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await UserService.getUserById(id);
      res.json({ status: "success", data: result.data });
    } catch (error) {
      next(error);
    }
  }

  
  async updateUser(req, res, next) {
    try {
      const result = await UserService.updateUser(req.params.id, req.body);
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const result = await UserService.forgotPassword(req.body.email);
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }

  async setNewPassword(req, res, next) {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;
      const result = await UserService.setNewPassword(
        email,
        otp,
        newPassword,
        confirmPassword
      );
      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
