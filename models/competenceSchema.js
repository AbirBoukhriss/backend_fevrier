const mongoose = require("mongoose");
const competenceSchema = new mongoose.Schema({
  nom: String,
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }
});

module.exports = mongoose.model("Competence", competenceSchema);