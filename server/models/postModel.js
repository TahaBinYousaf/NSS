const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // URL or base64 image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
