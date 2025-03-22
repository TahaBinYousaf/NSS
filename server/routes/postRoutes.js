const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const authenticateUser = require("../middleware/authMiddleware");
router.post("/", authenticateUser, postItemController);


// 🟢 Create a new post
router.post("/", async (req, res) => {
    try {
        const { category, title, description, location, price, image } = req.body;

        if (!category || !title || !description || !location || !price) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newPost = new Post({ category, title, description, location, price, image });
        await newPost.save();
        
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
});

// 🟢 Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
});

module.exports = router;
