const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/nss-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected for test"))
.catch(err => console.error("MongoDB connection error:", err));

// Import the models
const Post = require("../models/Post");

// Check if post exists
async function checkPost() {
  try {
    const postId = "67f25f192e9d28f95d05fafe";
    console.log("Checking post with ID:", postId);
    
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      
      // List all posts in the database
      const allPosts = await Post.find().limit(5);
      console.log("Sample posts in database:", allPosts);
    } else {
      console.log("Post found:", post);
    }
  } catch (error) {
    console.error("Error checking post:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Run the function
checkPost(); 