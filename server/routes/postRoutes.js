const express = require("express");
const router = express.Router();
const { createPost, getPostsByCategory, getPostById } = require("../controllers/postController");
const { upload } = require("../services/multer");
const { verifyToken } = require("../middleware/authMiddleware");

// 🟢 Create a new post
router.post("/", verifyToken, upload.array("images", 5), createPost);

router.get("/:category/:limit/:option", getPostsByCategory);
router.get("/getById/:id", getPostById);

module.exports = router;
