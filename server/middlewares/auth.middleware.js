const connectToDb = require("../config/db");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
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
    }
    const { id } = decoded;
    connectToDb();
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        msg: "unauthenticated",
      });
    }
    next();
  });
};

module.exports = auth;
