const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// register user API

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, phone });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register new user" });
  }
};
// log in user API
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    delete user.password;

    res.status(200).json({
      message: "Logged In Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed, Try again" });
  }
};

// 🔹 Forgot Password API (Generate Reset Token & Send Email)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate a JWT reset token (valid for 1 hour)
    const resetToken = jwt.sign({ id: user._id, resetTokenVersion: user.resetTokenVersion }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password:\n\n ${process.env.FRONTEND_URL}/reset-password?t=${resetToken} \n\n This link will expire in 1 hour.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to forgot password, Try Again!" });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) throw new Error("No Token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) throw new Error("Expired");
    const user = await User.findById(decoded.id).select("resetTokenVersion -_id").lean();
    if (user.resetTokenVersion !== decoded.resetTokenVersion) throw new Error("Expired");

    res.status(200).json({ message: "Verified" });
  } catch (err) {
    res.status(500).json({ message: "Invalid Link!" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) throw new Error("No Token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) throw new Error("Expired");

    const { password } = req.body;
    const _id = decoded.id;

    const user = await User.findById(_id).select("resetTokenVersion");
    if (user.resetTokenVersion !== decoded.resetTokenVersion) throw new Error("Expired");
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetTokenVersion = decoded.resetTokenVersion + 1;
    await user.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to reset password, Try Again!" });
  }
};

exports.updateProfileWithImage = async (req, res) => {
  try {
    const { name, phone, gender, location } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updatedFields = {
      name: name || user.name,
      phone: phone || user.phone,
      gender: gender || user.gender,
      location: location || user.location,
    };

    if (req.file) {
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, "..", user.profileImage);

        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          if (error.code !== "ENOENT") {
            console.error("Failed to delete old profile image:", error);
          }
        }
      }

      updatedFields.profileImage = `uploads/profile/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: updatedFields }, { new: true, select: "-password" });

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: "Failed to update profile try again" });
  }
};
