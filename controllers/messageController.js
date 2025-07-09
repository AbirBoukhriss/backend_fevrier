const Message = require("../models/messageSchema");

// Create (send) a new message
exports.sendMessage = async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // tri du plus récent au plus ancien
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a message
exports.updateMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        user: req.body.user,
        notification: req.body.notification
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    await Notification.deleteMany({ messageId: req.params.id });
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages for a specific user (sender or receiver via notification)
exports.getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({
      $or: [{ user: userId }, { notification: userId }]
    }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages between two users (via user and notification)
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { user1Id, user2Id } = req.params;

    const messages = await Message.find({
      $or: [
        { user: user1Id, notification: user2Id },
        { user: user2Id, notification: user1Id }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
