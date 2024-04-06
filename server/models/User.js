const mongoose = require("mongoose");
const Comment = require("./Comment");

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    shippingAddress: {
      type: String,
      default: "",
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userShema);

module.exports = User;
