const express = require("express");
const adminAuth = require("../middlewares/admin.middleware");

const {
  getUsers,
  getUser,
  banUser,
  unBanUser,
  editUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", adminAuth, getUsers);
router.get("/:userId", adminAuth, getUser);
router.patch("/ban/:userId", adminAuth, banUser);
router.patch("/unban/:userId", adminAuth, unBanUser);
router.patch("/:userId", adminAuth, editUser);
router.delete("/:userId", adminAuth, deleteUser);

module.exports = router;
