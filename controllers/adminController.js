const User = require("../models/User");
const mongoose = require("mongoose");
const Blog = require("../models/BlogPost");
module.exports = {
  userRegisterationList: async (req, res) => {
    try {
      const query = req.query.status;
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      if (page < 1 || limit < 1) {
        return res
          .status(400)
          .json({ message: "Page and limit must be positive integers" });
      }

      let filter = {};

      if (query && query.toLowerCase() !== "all") {
        filter = { isApproved: query };
      }
      const skip = (page - 1) * limit;
      const users = await User.find(filter, "username email isAdmin isApproved")
        .skip(skip)
        .limit(limit);

      const totalUsers = await User.countDocuments(filter);
      const totalPages = Math.ceil(totalUsers / limit);
      return res.status(200).json({
        totalUsers,
        totalPages,
        currentPage: page,
        limit,
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  approveUser: async (req, res) => {
    const { userId } = req.params;
    console.log("UserId: ", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isApproved = "Approved";
      await user.save();
      res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  rejectUser: async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isApproved = "Rejected";
      await user.save();
      res.status(200).json({ message: "User rejected successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  searchUsers: async (req, res) => {
    const { username, email } = req.query;
    const query = {};

    if (username) {
      query.username = { $regex: username, $options: "i" };
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    try {
      const users = await User.find(query);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  searchBlogs: async (req, res) => {
    try {
      const query = req.query.search;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }

      const blogs = await Blog.find({
        title: { $regex: query, $options: "i" },
      });

      return res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
