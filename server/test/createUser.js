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

// Import the User model
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create user
async function createUser() {
  try {
    console.log("Creating user with provided credentials");
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: "qarar7937@gmail.com" });
    if (existingUser) {
      console.log("User already exists:", existingUser._id);
      return existingUser._id;
    }
    
    // Create new user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      _id: "67f2466188656aa0642688b1", // Use the specific ID you provided
      name: "Noman Nawaz",
      email: "qarar7937@gmail.com",
      password: hashedPassword,
      phone: "03338001884",
      resetTokenVersion: 0
    });
    
    const savedUser = await user.save();
    console.log("User created successfully:", savedUser._id);
    
    return savedUser._id;
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Export the function instead of running it
module.exports = createUser; 