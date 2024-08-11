const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const AuthMiddleware = require("../middlewares/auth");

router.post("/register", register);
router.use(AuthMiddleware.protect);
router.post("/login", login);

module.exports = router;
