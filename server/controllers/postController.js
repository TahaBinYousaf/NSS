const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    let images = [];
    if (req.files?.length) {
      images = req.files.map(file => `uploads/profile/${file.filename}`);
      console.log(req.files.map(file => file.filename));
    }

    const { title, description, location, condition, price, resourceType, category } = req.body;

    await Post.create({
      title,
      description,
      location,
      condition,
      price,
      resourceType,
      category,
      user: req.user.id,
      images,
    });

    return res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to upload post, Try again!" });
  }
};
