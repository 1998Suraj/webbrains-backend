const Blog = require("../models/BlogPost");
const mongoose = require("mongoose");

module.exports = {
  getAllPosts: async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers" });
    }

    try {
      const skip = (page - 1) * limit;
      const blogPosts = await Blog.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalPosts = await Blog.countDocuments();

      res.status(200).json({
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        blogPosts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getBlogPostById: async (req, res) => {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid blog post ID format" });
    }

    try {
      const blogPost = await Blog.findById(postId);

      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(200).json(blogPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createPost: async (req, res) => {
    const { title, content } = req.body;

    try {
      const newPost = new Blog({ title, content });
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
      const updatedPost = await Blog.findByIdAndUpdate(
        postId,
        { title, content, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deletePost: async (req, res) => {
    const postId = req.params.id;

    try {
      const deletedPost = await Blog.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.status(200).json({ message: "Blog post deleted", deletedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
