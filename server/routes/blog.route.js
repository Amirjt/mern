const express = require("express");
const adminAuth = require("../middlewares/admin.middleware");

const {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
} = require("../controllers/blog.controller");

const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getPost);
router.post("/", adminAuth, addPost);
router.patch("/:postId", adminAuth, editPost);
router.delete("/:postId", adminAuth, deletePost);

module.exports = router;
