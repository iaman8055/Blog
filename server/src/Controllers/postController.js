import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
      author: req.user.name,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("title content author user createdAt");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET POST BY ID
export const getPostbyId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name _id"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: post.author || post.user?.name,
      authorId: post.user,
      createdAt: post.createdAt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE POST (Only author can update)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE POST (Only author can delete)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
