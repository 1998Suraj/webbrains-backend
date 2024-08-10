const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const AuthMiddleware = require("../middlewares/auth");
const admin = AuthMiddleware.admin;
const protect = AuthMiddleware.protect;

// router.use(protect);
// router.use(admin);

router.put("/approve/:userId", AdminController.approveUser);
router.put("/reject/:userId", AdminController.rejectUser);
router.get("/users", AdminController.getAllUsers);
router.get("/users/search", AdminController.searchUsers);

module.exports = router;
