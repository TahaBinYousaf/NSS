const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  location: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  resetTokenVersion: { type: Number, default: 0 },
  // New fields for profile
  phone: { type: String },
  gender: { type: String },
  dob: { type: String },
  aboutMe: { type: String },
  profileImage: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
