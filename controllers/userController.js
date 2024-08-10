const User = require("../models/User");
const Blog = require("../models/BlogPost");
const mongoose = require("mongoose");

module.exports = {
  getUserDetail: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  likePost: async (req, res) => {
    const { userId, postId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user or post ID format" });
    }

    try {
      const user = await User.findById(userId);
      const blogPost = await Blog.findById(postId);

      if (!user || !blogPost) {
        return res.status(404).json({ message: "User or blog post not found" });
      }
      if (user.likedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post already liked" });
      }
      user.likedPosts.push(postId);
      await user.save();
      blogPost.likes.push(userId);
      await blogPost.save();

      res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  UnLikePost: async (req, res) => {
    const { userId, postId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user or post ID format" });
    }

    try {
      const user = await User.findById(userId);
      const blogPost = await Blog.findById(postId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.likedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post not liked" });
      }
      user.likedPosts = user.likedPosts.filter((id) => !id.equals(postId));
      await user.save();
      blogPost.likes = blogPost.likes.filter((id) => !id.equals(userId));
      await blogPost.save();

      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  savePost: async (req, res) => {
    const { userId, postId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user or post ID format" });
    }

    try {
      const user = await User.findById(userId);
      const blogPost = await Blog.findById(postId);

      if (!user || !blogPost) {
        return res.status(404).json({ message: "User or blog post not found" });
      }

      if (user.savedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post already saved" });
      }

      user.savedPosts.push(postId);
      await user.save();
      blogPost.saves.push(userId);
      await blogPost.save();

      res.status(200).json({ message: "Post saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  unSavePost: async (req, res) => {
    const { userId, postId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user or post ID format" });
    }

    try {
      const user = await User.findById(userId);
      const blogPost = await Blog.findById(postId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.savedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post not saved" });
      }

      user.savedPosts = user.savedPosts.filter((id) => !id.equals(postId));
      await user.save();
      blogPost.saves = blogPost.saves.filter((id) => !id.equals(userId));
      await blogPost.save();

      res.status(200).json({ message: "Post unsaved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getLikedPosts: async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
      const user = await User.findById(userId).populate("likedPosts");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.likedPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getSavedPosts: async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
      const user = await User.findById(userId).populate("savedPosts");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.savedPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
