const express = require("express");

const router = express.Router();

const {
  getMessages,
  addMessage,
  deleteMessage,
} = require("../controllers/messages.controller");

const adminAuth = require("../middlewares/admin.middleware");

router.post("/", addMessage);
router.get("/", adminAuth, getMessages);
router.delete("/:messageId", adminAuth, deleteMessage);

module.exports = router;
