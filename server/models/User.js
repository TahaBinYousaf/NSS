const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    // New fields for profile
    phone: { type: String },
    gender: { type: String },
    dob: { type: String },
    aboutMe: { type: String },
    profileImage: { type: String },
});

module.exports = mongoose.model("User", UserSchema);