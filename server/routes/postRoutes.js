const express = require("express");
const router = express.Router();
const { createPost, getPostsByCategory, getPostById, getAllPosts, deletePost } = require("../controllers/postController");
const { upload } = require("../services/multer");
const { verifyToken } = require("../middleware/authMiddleware");

// 🟢 Create a new post
router.post("/", verifyToken, upload.array("images", 5), createPost);

// Get posts by category with optional location filter
router.get("/:category/:limit/:option", getPostsByCategory);

// Get post by ID with user details
router.get("/getById/:id", getPostById);

router.get("/getAll", verifyToken, getAllPosts);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
