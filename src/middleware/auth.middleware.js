const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../config/error.config");

class AuthMiddleware {
  authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorHandler(401, "Unauthorized - Token not found");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorHandler(403, "Forbidden - Invalid token");
      }
      req.user = decoded;
      next();
    });
  }

  authorize(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        throw new ErrorHandler(403, "Forbidden - You do not have permission");
      }
      next();
    };
  }
}

module.exports = new AuthMiddleware();
