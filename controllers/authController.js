const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Secret = require("../config/credentials");
const Admin = require("../models/Admin");

module.exports = {
  register: async (req, res) => {
    try {
      const user = new User(req.body);
      const data = await user.save();
      res.status(200).send({ message: "User created successfully" });
    } catch (err) {
      res.status(400).send({ message: "Error creating user" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      // if (!user.isApproved) {
      //   return res.status(403).send({ message: "User is not approved" });
      // }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        Secret.jwt_secret
      );
      res.status(200).send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  },
};
