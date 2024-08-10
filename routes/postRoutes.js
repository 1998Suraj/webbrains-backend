const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const BlogPostController = require("../controllers/postController");
const admin = AuthMiddleware.admin;

router.get("/get-all-blogs", BlogPostController.getAllPosts);
router.get("/get-blog/:id", BlogPostController.getBlogPostById);

// router.use(admin);
router.post("/add-blog", BlogPostController.createPost);
router.put("/edit-blog/:id", BlogPostController.updatePost);
router.delete("/delete-blog/:id", BlogPostController.deletePost);

module.exports = router;
