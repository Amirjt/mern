const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const createCheckout = require("../controllers/stripe.controller");

router.post("/", auth, createCheckout);

module.exports = router;
