const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const AuthMiddleware = require("../middlewares/auth");
const admin = AuthMiddleware.admin;
const protect = AuthMiddleware.protect;

router.use(admin);
router.get("/user-register-list", AdminController.userRegisterationList);
router.put("/approve/:userId", AdminController.approveUser);
router.put("/reject/:userId", AdminController.rejectUser);
router.get("/users", AdminController.getAllUsers);
router.get("/users-search", AdminController.searchUsers);
router.get("/blog-search", AdminController.searchBlogs);

module.exports = router;
