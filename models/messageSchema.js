const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notification: { type: mongoose.Schema.Types.ObjectId, ref: "Notification" } // Ajout du receiver
});

module.exports = mongoose.model("Message", messageSchema);
