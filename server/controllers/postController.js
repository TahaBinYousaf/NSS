const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, description, category, condition, location, price, resourceType, type = "post" } = req.body;
    const images = req.files;

    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create post object
    const post = {
      title,
      description,
      category,
      location,
      type,
      user: req.user.id,
    };

    // Add optional fields if they exist
    if (condition) post.condition = condition;
    if (price) post.price = price;
    if (resourceType) post.resourceType = resourceType;

    // Only add images if it's not a request
    if (type !== "request" && images && images.length > 0) {
      post.images = images.map(image => image.path);
    }

    // Create and save the post
    const newPost = await Post.create(post);
    console.log("Created post:", {
      id: newPost._id,
      title: newPost.title,
      user: req.user.id,
    });

    // Return the post with populated user data
    const populatedPost = await Post.findById(newPost._id).populate("user", "name email phone profileImage").lean();

    return res.status(201).json({ message: "Post created successfully", post: populatedPost });
  } catch (err) {
    console.error("Error in createPost:", err);
    return res.status(500).json({ message: "Error creating post" });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const { category, limit, option } = req.params;
    const { location, searchQuery } = req.query;
    console.log("Backend - getPostsByCategory called with:", { category, limit, option, location, searchQuery });

    const sortOrder = option === "asc" ? 1 : -1;
    const queryLimit = limit && limit !== "all" ? parseInt(limit) : null;

    // Build the query
    const query = { category };

    // Add location filter if provided
    if (location) {
      console.log("Backend - Adding location filter:", location);
      query.location = location;

      // Check if there are any posts with this location
      const locationCount = await Post.countDocuments({ location });
      console.log("Backend - Total posts with location:", location, ":", locationCount);
    }

    // Add search query filter if provided
    if (searchQuery) {
      console.log("Backend - Adding search query filter:", searchQuery);
      // Use regex for case-insensitive search in title and description
      query.$or = [{ title: { $regex: searchQuery, $options: "i" } }, { description: { $regex: searchQuery, $options: "i" } }];
    }

    console.log("Backend - Final query:", query);

    // Execute the query
    let postsQuery = Post.find(query).populate("user", "name email phone profileImage").sort({ createdAt: sortOrder }).lean();

    // Apply limit if specified
    if (queryLimit) {
      postsQuery = postsQuery.limit(queryLimit);
    }

    // Execute the query and get results
    const posts = await postsQuery;
    console.log("Backend - Found posts:", posts.length);

    // Return the results
    return res.status(200).json({ posts });
  } catch (err) {
    console.error("Backend - Error in getPostsByCategory:", err);
    return res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching post with ID:", id);

    if (!id) {
      console.error("No post ID provided");
      return res.status(400).json({ message: "Post ID is required" });
    }

    // First, find the post without population to check if it exists
    const postExists = await Post.findById(id);
    if (!postExists) {
      console.log("Post not found with ID:", id);
      return res.status(404).json({ message: "Post not found" });
    }

    // Now populate the user data
    const post = await Post.findById(id)
      .populate({
        path: "user",
        select: "name email phone profileImage _id",
        model: "User",
      })
      .lean();

    console.log("User data:", {
      id: post.user._id,
      name: post.user.name,
      email: post.user.email,
      phone: post.user.phone,
      profileImage: post.user.profileImage,
    });

    // Check if user data is properly populated
    if (!post.user) {
      console.log("User data not populated for post:", id);
      return res.status(404).json({ message: "User data not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    console.error("Error in getPostById:", err);
    return res.status(500).json({ message: "Error fetching post" });
  }
};

exports.getAllPosts = async (_, res) => {
  try {
    const posts = await Post.find({}).lean();

    return res.status(200).json({ posts });
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    return res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    return res.status(500).json({ message: "Error deleting post" });
  }
};
