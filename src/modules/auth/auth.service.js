const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Helper = require("../../config/helper.config");
const EmailService = require("../../service/email.service");
const { ErrorHandler } = require("../../config/error.config");

class AuthService {
  async register(userData, file) {
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

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        throw new ErrorHandler(400, "Passwords do not match");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ErrorHandler(400, "Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const activationToken = Helper.generateRandomString();

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
        status: "inactive",
        image: file ? file.path : null,
      });

      await newUser.save();

      return {
        message: "User registered successfully",
        activationToken,
      };
    } else {
      const activationToken = Helper.generateRandomString();

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        country,
        address,
        phone,
        role,
        activationToken,
        status: "inactive",
        image: file ? file.path : null,
      });

      await newUser.save();

      return {
        message: "User registered successfully",
        activationToken,
      };
    }
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

  async loginUser(credentials) {
    const { username, password } = credentials;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      throw new ErrorHandler(400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ErrorHandler(400, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      message: "Login successful",
      token,
    };
  }

  async getDashboardDetails(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  }

  async adminDashboard() {
    const users = await User.find({ role: "customer" }).select("-password");
    return users;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
    user.status = "inactive"; // Set status to inactive

    await user.save();

    // Send OTP to user's email
    const subject = "Password Reset OTP";
    const text = `Your OTP for password reset is: ${otp}`;
    await EmailService.sendEmail(email, subject, text);

    return { message: "OTP sent to your email" };
  }

  async setNewPassword(email, otp, newPassword, confirmPassword) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    if (user.resetPasswordOTP !== otp) {
      throw new ErrorHandler(400, "Invalid OTP");
    }

    if (user.resetPasswordExpires < Date.now()) {
      throw new ErrorHandler(400, "OTP expired");
    }

    if (newPassword !== confirmPassword) {
      throw new ErrorHandler(400, "Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    user.status = "active"; // Set status to active

    await user.save();

    return { message: "Password reset successful" };
  }
}

module.exports = new AuthService();
