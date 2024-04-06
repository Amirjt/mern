const mongoose = require("mongoose");
const Product = require("./Product");

const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    body: {
      type: String,
      required: true,
    },
    confirmedByAdmin: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
