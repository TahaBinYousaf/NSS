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

// Create a test post
async function createTestPost() {
  try {
    // First verify the user exists
    const user = await User.findById("67f2466188656aa0642688b1");
    if (!user) {
      console.error("User not found");
      return;
    }
    console.log("Found user:", user.name);

    const testPost = new Post({
      title: "Test Post",
      description: "This is a test post created for debugging purposes",
      category: "Books",
      location: "Lahore",
      user: user._id,
      type: "post",
      condition: "New",
      price: 100
    });

    const savedPost = await testPost.save();
    console.log("Test post created successfully:", savedPost);
    
    // Find the post to verify it was saved
    const foundPost = await Post.findById(savedPost._id)
      .populate("user", "name email phone profileImage")
      .lean();
    console.log("Found post with populated user data:", foundPost);
    
    return savedPost._id;
  } catch (error) {
    console.error("Error creating test post:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Export the function instead of running it
module.exports = createTestPost; 