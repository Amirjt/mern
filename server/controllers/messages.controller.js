const connectToDb = require("../config/db");
const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    connectToDb();
    const messages = await Message.find({}).sort({ _id: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const addMessage = async (req, res) => {
  try {
    connectToDb();
    const { name, email, number, message } = req.body;

    await Message.create({
      name,
      email,
      number,
      message,
    });

    return res.status(201).json({
      msg: "Message Sent",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    connectToDb();
    await Message.findByIdAndDelete(messageId);
    return res.status(200).json({
      msg: "Message deleted",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = {
  getMessages,
  addMessage,
  deleteMessage,
};
