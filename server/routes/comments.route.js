const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const authAdmin = require("../middlewares/admin.middleware");
const {
  getComments,
  addComment,
  confirmComment,
  deleteComment,
} = require("../controllers/comments.controller");

router.get("/", getComments);
router.post("/", auth, addComment);
router.patch("/:commentId", authAdmin, confirmComment);
router.delete("/:commentId", authAdmin, deleteComment);

module.exports = router;
