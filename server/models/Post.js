const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  category: String,
  images: [String],
  title: String,
  description: String,
  condition: String,
  location: String,
  price: String,
  resourceType: String,
  type: { type: String, enum: ['post', 'request'], default: 'post' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  on: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
