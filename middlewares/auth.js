const jwt = require("jsonwebtoken");
const secret = require("../config/credentials");
const User = require("../models/User");

module.exports = {
  protect: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      const decoded = jwt.verify(token, secret.jwt_secret);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.isApproved === "Pending") {
        return res
          .status(403)
          .json({ message: "Your account is in under review" });
      }
      if (user.isApproved === "Rejected") {
        return res
          .status(403)
          .json({ message: "Your account is rejected by admin" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  },

  admin: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      const decoded = jwt.verify(token, secret.jwt_secret);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.isAdmin === false) {
        return res.status(403).json({ message: "Admin access required" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  },
};
