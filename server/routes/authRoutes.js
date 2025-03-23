const express = require("express");
const { registerUser, loginUser, forgotPassword, verifyResetToken, resetPassword, updateProfileWithImage } = require("../controllers/authController.js");

const { upload } = require("../services/multer.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

// Create a new updateProfile handler that includes file upload

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

router.put("/profile", verifyToken, upload.single("profileImage"), updateProfileWithImage);

module.exports = router;
