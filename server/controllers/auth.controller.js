const connectToDb = require("../config/db");

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Simple Validation
  if (!username.trim() || !email.trim() || !password.trim()) {
    return res.status(500).json({
      msg: "Invalid Information",
    });
  }

  try {
    connectToDb();

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    await User.create(newUser);

    return res.status(201).json({
      msg: "User Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};
const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(500).json({
      msg: "Invalid Information",
    });
  }

  try {
    connectToDb();
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "Password or Email is not correct",
      });
    }

    if (user.isBanned) {
      return res.status(403).json({
        msg: "This user is Banned",
      });
    }

    const age = 1000 * 60 * 60 * 24 * 3;

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        path: "/",
      })
      .status(200)
      .json({
        msg: "User loged in",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const me = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "unauthenticated",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        msg: "unauthenticated",
      });
    } else {
      connectToDb();
      const { id: userId } = decoded;
      const user = await User.findOne({ _id: userId }, "-password");
      return res.status(200).json(user);
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    msg: "loged out successfully",
  });
};

module.exports = {
  register,
  login,
  me,
  logout,
};
