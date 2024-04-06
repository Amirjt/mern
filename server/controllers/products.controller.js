const connectToDb = require("../config/db");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

const addNewProduct = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      price,
      off,
      category,
      quantityAvailable,
      color,
      images,
    } = req.body;

    connectToDb();

    await Product.create({
      name,
      shortdescription: shortDescription,
      description,
      price,
      off,
      category,
      quantityAvailable,
      color,
      images,
    });

    return res.status(201).json({
      msg: "Product Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    connectToDb();
    let query = {};

    if (req.query.search) {
      query.name = { $regex: new RegExp(req.query.search, "i") };
    }

    if (req.query.cat) {
      query.category = req.query.cat;
    }

    if (req.query.brand) {
      query.brand = req.query.brand;
    }

    if (req.query.min || req.query.max) {
      const minPrice = req.query.min
        ? parseInt(req.query.min)
        : Number.NEGATIVE_INFINITY;
      const maxPrice = req.query.max
        ? parseInt(req.query.max)
        : Number.POSITIVE_INFINITY;

      query.finalPrice = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    const products = await Product.aggregate([
      {
        $addFields: {
          finalPrice: {
            $multiply: [
              "$price",
              { $subtract: [1, { $divide: ["$off", 100] }] },
            ],
          },
        },
      },
      {
        $match: query,
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    connectToDb();
    const product = await Product.findById(req.params.id);
    product.comments = await Comment.find({ productId: product._id })
      .populate("userId")
      .populate("productId")
      .sort({ _id: -1 });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    connectToDb();
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    connectToDb();
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ msg: "Product Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Error" });
  }
};

module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
};
