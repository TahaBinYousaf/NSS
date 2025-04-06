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

// Update post
async function updatePost() {
  try {
    const postId = "67f25f192e9d28f95d05fafe";
    console.log("Updating post with ID:", postId);
    
    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      return;
    }
    
    // Find the user
    const user = await User.findOne({ email: "qarar7937@gmail.com" });
    if (!user) {
      console.log("User not found");
      return;
    }
    
    console.log("Found user:", user._id);
    
    // Update the post with the user ID
    post.user = user._id;
    await post.save();
    
    console.log("Post updated with user ID:", user._id);
    
    // Verify the update
    const updatedPost = await Post.findById(postId).populate("user", "name email phone profileImage");
    console.log("Updated post with user data:", {
      _id: updatedPost._id,
      title: updatedPost.title,
      user: updatedPost.user ? {
        _id: updatedPost.user._id,
        name: updatedPost.user.name,
        email: updatedPost.user.email,
        phone: updatedPost.user.phone
      } : null
    });
  } catch (error) {
    console.error("Error updating post:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Export the function instead of running it
module.exports = updatePost; 