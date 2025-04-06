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

// Check users
async function checkUsers() {
  try {
    console.log("Checking users in database");
    
    const users = await User.find().limit(5);
    console.log("Found users:", users.length);
    
    if (users.length > 0) {
      users.forEach(user => {
        console.log("User:", {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      });
    } else {
      console.log("No users found in database");
    }
  } catch (error) {
    console.error("Error checking users:", error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
}

// Run the function
checkUsers(); 