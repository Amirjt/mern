const connectToDB = require("../config/db");
const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    connectToDB();
    const comments = await Comment.find({})
      .sort({ _id: -1 })
      .populate("userId")
      .populate("productId");
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const addComment = async (req, res) => {
  const { rating, body, userId, productId } = req.body;
  try {
    connectToDB();
    await Comment.create({
      rating,
      body,
      userId,
      productId,
    });

    return res.status(201).json({ msg: "Comment Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const confirmComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    connectToDB();
    await Comment.findByIdAndUpdate(commentId, {
      $set: {
        confirmedByAdmin: true,
      },
    });
    return res.status(200).json({
      msg: "Comment Confirmed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    connectToDB();
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({
      msg: "Comment Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = {
  getComments,
  addComment,
  confirmComment,
  deleteComment,
};
