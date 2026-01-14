const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser, logout } = require("../../controller/auth/auth.controller");
const { authenticateToken } = require("../../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);

module.exports = router;
