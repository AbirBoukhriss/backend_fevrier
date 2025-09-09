const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  delivered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Vérifie si le modèle existe déjà (évite OverwriteModelError)
module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);
