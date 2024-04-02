const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { ErrorHandler } = require("../../config/error.config");

class UserService {
  async createUser(userData, file) {
    const {
      firstName,
      lastName,
      username,
      email,
      country,
      address,
      phone,
      role,
      password,
      confirmPassword,
    } = userData;

    if (password !== confirmPassword) {
      throw new ErrorHandler(400, "Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler(400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      country,
      address,
      phone,
      role,
      password: hashedPassword,
      activationToken,
      image: file ? file.path : null,
    });

    await newUser.save();

    return { message: "User created successfully", activationToken };
  }

  async activateUser(activationToken) {
    const user = await User.findOne({ activationToken });

    if (!user) {
      throw new ErrorHandler(400, "Invalid activation token");
    }

    if (user.status === "active") {
      throw new ErrorHandler(400, "User already activated");
    }

    user.status = "active";
    user.activationToken = null;
    await user.save();

    return {
      message: "User activated successfully",
      email: user.email,
    };
  }

  async getUsers() {
    const users = await User.find({});
    return { data: users };
  }

  async getUserById(id) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return { data: user };
  }


  async updateUser(id, userData) {
    const user = await User.findById(id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    Object.assign(user, userData);

    await user.save();

    return { message: "User updated successfully", data: user };
  }

  async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    await user.deleteOne();
    return { message: "User deleted successfully", data: user };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    return { message: "OTP generated successfully", otp };
  }

  async setNewPassword(email, otp, newPassword, confirmPassword) {
    const user = await User.findOne({ email });

    if (!user || user.resetPasswordOTP !== otp) {
      throw new ErrorHandler(400, "Invalid OTP");
    }

    if (newPassword !== confirmPassword) {
      throw new ErrorHandler(400, "Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.status = "active";

    await user.save();

    return { message: "Password updated successfully" };
  }
}

module.exports = new UserService();
