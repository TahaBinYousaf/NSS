const express = require("express");
const { postItem, getAllItems } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route to post a new item (Protected)
router.post("/post", protect, postItem);

// ✅ Route to get all items
router.get("/", getAllItems);

module.exports = router;
