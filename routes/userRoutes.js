const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const UserController = require("../controllers/userController");

// router.use(AuthMiddleware.protect);
router.get("/get-user/:id", UserController.getUserDetail);
router.post("/like/:userId/:postId", UserController.likePost);
router.post("/unlike/:userId/:postId", UserController.UnLikePost);
router.post("/save/:userId/:postId", UserController.savePost);
router.post("/unsave/:userId/:postId", UserController.unSavePost);
router.get("/liked-posts/:userId", UserController.getLikedPosts);
router.get("/saved-posts/:userId", UserController.getSavedPosts);

module.exports = router;
