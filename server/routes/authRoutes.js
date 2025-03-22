const express = require("express");
const { registerUser, loginUser, forgotPassword, getProfile, verifyResetToken, resetPassword } = require("../controllers/authController.js");

const authMiddleware = require("../middleware/authMiddleware");

// Import multer for file uploads
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/profile";

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with user ID and timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const userId = req.user.id; // From auth middleware
    const fileExt = path.extname(file.originalname);
    cb(null, `profile-${userId}-${uniqueSuffix}${fileExt}`);
  },
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Create a new updateProfile handler that includes file upload
const updateProfileWithImage = async (req, res) => {
  try {
    const { name, email, phone, gender, location, dob, aboutMe } = req.body;

    // Find user (assuming req.user is set by authMiddleware)
    const User = require("../models/User"); // Import User model
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.location = location || user.location;
    user.dob = dob || user.dob;
    user.aboutMe = aboutMe || user.aboutMe;

    // Handle profile image update
    if (req.file) {
      // If user already has a profile image, delete the old one
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, "..", user.profileImage);

        // Check if file exists before trying to delete
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new image path to user object
      user.profileImage = `uploads/profile/${req.file.filename}`;
    }

    // Save updated user
    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).send("Server Error");
  }
};

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

router.route("/profile").get(authMiddleware, getProfile).put(authMiddleware, upload.single("profileImage"), updateProfileWithImage);

module.exports = router;
