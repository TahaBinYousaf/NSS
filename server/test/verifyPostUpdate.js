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
const User = require("../models/User");

// Verify post update
async function verifyPostUpdate() {
  try {
    const postId = "67f25f192e9d28f95d05fafe";
    console.log("Verifying post with ID:", postId);
    
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      return;
    }
    
    console.log("Post found:", {
      _id: post._id,
      title: post.title,
      description: post.description,
      category: post.category,
      user: post.user,
      type: post.type,
      createdAt: post.createdAt
    });
    
    // Check if the user exists
    if (post.user) {
      const user = await User.findById(post.user);
      if (user) {
        console.log("User found:", {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      } else {
        console.log("User not found for ID:", post.user);
      }
    } else {
      console.log("Post still has no user field");
      
      // Try to fix the post again
      console.log("Attempting to fix post by adding user field");
      post.user = "67f2466188656aa0642688b1"; // Your user ID
      await post.save();
      console.log("Post updated with user field");
      
      // Verify the update
      const updatedPost = await Post.findById(postId);
      console.log("Updated post:", {
        _id: updatedPost._id,
        user: updatedPost.user
      });
    }
  } catch (error) {
    console.error("Error verifying post update:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Run the function
verifyPostUpdate(); 