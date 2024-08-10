const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Secret = require("../config/credentials");

module.exports = {
  register: async (req, res) => {
    try {
      const user = new User(req.body);
      const data = await user.save();
      const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin },
      Secret.jwt_secret
    );
      res.status(201).send({jwt_token:token,  message: "User created successfully" });
    } catch (err) {
      res.status(400).send({ message: "Error creating user" });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !user.isApproved) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    } catch (err) {
      res.status(401).send({ message: "Invalid credentials" });
    }
  },
};
