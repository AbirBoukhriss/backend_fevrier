const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  declenche: { type: String },
          // lien vers User
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },     // one-to-one
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
});

module.exports = mongoose.model("Notification", notificationSchema);