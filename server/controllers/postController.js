const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    let images = [];
    if (req.files?.length) {
      images = req.files.map(file => `uploads/profile/${file.filename}`);
    }

    const { title, description, location, condition, price, resourceType, category, on } = req.body;

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
      on,
    });

    return res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to upload post, Try again!" });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const { category, limit, option } = req.params;
    const sortOrder = option === "asc" ? 1 : -1;
    const queryLimit = limit ? parseInt(limit) : null;
    let postsQuery = Post.find({ category }, { images: { $slice: 1 }, user: 0 })
      .sort({ createdAt: sortOrder })
      .lean();
    if (queryLimit) {
      postsQuery = postsQuery.limit(queryLimit);
    }

    const posts = await postsQuery;
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({});
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user", "name email phone profileImage").lean();

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({});
  }
};
