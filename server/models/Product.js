const mongoose = require("mongoose");
const Comment = require("./Comment");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortdescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    off: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
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

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
