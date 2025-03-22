const Item = require("../models/itemModel");

// ✅ Post an item
exports.postItem = async (req, res) => {
  try {
    const { title, description, category, price, location, image } = req.body;
    const userId = req.user.id; // Get logged-in user ID from JWT

    if (!title || !description || !category || !price || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      title,
      description,
      category,
      price,
      location,
      image,
      user: userId,
    });

    await newItem.save();
    res.status(201).json({ message: "Item posted successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name email");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
