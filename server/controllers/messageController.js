const Message = require("../models/Message");

exports.send = async (req, res) => {
  try {
    const { message, to } = req.body;

    await Message.create({
      message,
      to,
      from: req.user.id,
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send message" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user.id;
    const messages = await Message.find({
      $or: [
        { from: myId, to: userId },
        { from: userId, to: myId },
      ],
    }).lean();

    return res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json({});
  }
};
