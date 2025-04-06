const Message = require("../models/Message");
const User = require("../models/User");

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
    
    // Check if userId is valid
    if (!userId || userId === 'undefined') {
      console.error("Invalid user ID:", userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { from: myId, to: userId },
        { from: userId, to: myId },
      ],
    }).sort({ createdAt: 1 }).lean();
    
    // Get user information
    const user = await User.findById(userId).select('name email profileImage').lean();
    
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }
    
    // Mark messages as read
    await Message.updateMany(
      {
        from: userId,
        to: myId,
        read: false
      },
      { read: true }
    );

    return res.status(200).json({ messages, user });
  } catch (err) {
    console.error("Error getting messages:", err);
    return res.status(500).json({ message: "Failed to get messages" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const myId = req.user.id;
    
    // Get all messages where the current user is either sender or receiver
    const messages = await Message.find({
      $or: [
        { from: myId },
        { to: myId },
      ],
    }).sort({ createdAt: -1 }).lean();
    
    // Get unique user IDs from messages
    const userIds = [...new Set(messages.map(msg => 
      msg.from.toString() === myId ? msg.to : msg.from
    ))];
    
    // Get user details for each conversation
    const users = await User.find({ _id: { $in: userIds } })
      .select('_id name email profileImage')
      .lean();
    
    // Create a map of user details for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = user;
    });
    
    // Group messages by conversation
    const conversations = {};
    messages.forEach(msg => {
      const otherUserId = msg.from.toString() === myId ? msg.to.toString() : msg.from.toString();
      
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: userMap[otherUserId] || { _id: otherUserId, name: 'Unknown User' },
          lastMessage: msg,
          unreadCount: msg.to.toString() === myId && !msg.read ? 1 : 0
        };
      } else {
        // Update unread count if message is unread and sent to current user
        if (msg.to.toString() === myId && !msg.read) {
          conversations[otherUserId].unreadCount += 1;
        }
      }
    });
    
    // Convert to array and sort by last message time
    const conversationsList = Object.values(conversations).sort((a, b) => 
      new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );
    
    return res.status(200).json({ conversations: conversationsList });
  } catch (err) {
    console.error("Error getting conversations:", err);
    return res.status(500).json({ message: "Failed to get conversations" });
  }
};
