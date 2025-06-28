const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  contenu: String,
  dateCreation: Date,
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelance" }
});
module.exports = mongoose.model("Comment", commentSchema);