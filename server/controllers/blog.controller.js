const connectToDb = require("../config/db");
const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    connectToDb();
    const posts = await Post.find({}).sort({ _id: -1 }).populate("user");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal error: " + error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    connectToDb();
    const post = await Post.findById(req.params.postId).populate("user");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal error: " + error.message,
    });
  }
};

const addPost = async (req, res) => {
  try {
    connectToDb();
    const { title, body, image, user } = req.body;
    const newPost = {
      title,
      body,
      image,
      user,
    };

    await Post.create(newPost);

    return res.status(201).json({
      msg: "Post Added",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const editPost = async (req, res) => {
  try {
    connectToDb();
    const { title, body, image, user } = req.body;

    await Post.findByIdAndUpdate(req.params.postId, {
      title,
      body,
      image,
      user,
    });

    return res.status(200).json({
      msg: "Post Edited",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    connectToDb();
    await Post.findByIdAndDelete(req.params.postId);

    return res.status(200).json({
      msg: "Post Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
};
