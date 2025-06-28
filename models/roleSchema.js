const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } ,
  users:[{type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ex: "admin", "client", "freelancer"
});

module.exports = mongoose.model("Role", roleSchema);
