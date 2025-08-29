const Message = require("../models/messageReelModel");

// Récupérer l’historique entre deux users
exports.getMessages = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages || []);
  } catch (err) {
    console.error("Erreur getMessages:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
