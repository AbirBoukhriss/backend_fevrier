// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const Message = require("../models/messageSchema");

// GET /messages/received/:userId
router.get("/received/:userId", async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.params.userId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
