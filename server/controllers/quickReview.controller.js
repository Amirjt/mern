const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Comment = require("../models/Comment");

const getData = async (req, res) => {
  try {
    const products = await Product.find({});
    const orders = await Order.find({});
    const users = await User.find({});
    const comments = await Comment.find({});

    return res.status(200).json({
      products,
      orders,
      users,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = getData;
