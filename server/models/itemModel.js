const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ["rent", "sell", "share"] },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String }, // Stores the image filename
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Item", ItemSchema);
