const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middleware/authMiddleware");

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all conversations for the current user
router.get("/conversations", messageController.getConversations);

// Get messages between current user and another user
router.get("/:userId", verifyToken, messageController.getAll);

// Send a message
router.post("/", messageController.send);

module.exports = router;
