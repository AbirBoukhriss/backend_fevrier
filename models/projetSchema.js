const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema({
  nomProjet: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  file: { type: String },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelance", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Projet", projetSchema);
