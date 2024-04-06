const connectToDB = require("../config/db");
const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    connectToDB();
    const users = await User.find({}).sort({ _id: -1 }).populate("comments");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    connectToDB();
    const user = await User.findById(userId).populate("comments");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const banUser = async (req, res) => {
  const { userId } = req.params;
  try {
    connectToDB();
    await User.findByIdAndUpdate(userId, {
      $set: {
        isBanned: true,
      },
    });
    return res.status(200).json({
      msg: "User is Banned",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const unBanUser = async (req, res) => {
  const { userId } = req.params;
  try {
    connectToDB();
    await User.findByIdAndUpdate(userId, {
      $set: {
        isBanned: false,
      },
    });
    return res.status(200).json({
      msg: "User is Unbanned",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  try {
    connectToDB();
    await User.findByIdAndUpdate(userId, req.body);
    return res.status(200).json({
      msg: "User Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    connectToDB();
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      msg: "User Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  banUser,
  unBanUser,
  editUser,
  deleteUser,
};
