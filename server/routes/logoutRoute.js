const express = require("express");
const router = express.Router();

// Temporary in-memory token blacklist (use Redis in production)
const tokenBlacklist = new Set();

// Logout route
router.post("/logout", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "No token provided" });
    
    tokenBlacklist.add(token); // ✅ Blacklist the token
    res.json({ message: "Logged out successfully" });
});

// Export the router and blacklist separately
module.exports = { router, tokenBlacklist };