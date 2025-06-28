const mongoose = require("mongoose");
const projetSchema = new mongoose.Schema({
  nomProjet: String,
  description: String,
  url: String,
  file: String,
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }
});

module.exports = mongoose.model("Projet", projetSchema);