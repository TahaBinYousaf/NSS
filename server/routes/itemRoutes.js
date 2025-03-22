const express = require("express");
const { postItem, getAllItems } = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route to post a new item (Protected)
router.post("/post", authMiddleware, postItem);

// ✅ Route to get all items
router.get("/", getAllItems);

module.exports = router;
