const express = require("express");

const router = express.Router();

const getData = require("../controllers/quickReview.controller");
const adminAuth = require("../middlewares/admin.middleware");

router.get("/", adminAuth, getData);

module.exports = router;
