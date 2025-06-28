const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date_debut: Date,
  date_fin: Date,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  categorieTaskId: { type: mongoose.Schema.Types.ObjectId, ref: "CategorieTask" },
  notificationId: { type: mongoose.Schema.Types.ObjectId, ref: "Notification", unique: true }
}, { timestamps: true });
module.exports = mongoose.model("Task", taskSchema);