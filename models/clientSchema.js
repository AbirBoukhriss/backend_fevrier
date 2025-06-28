const mongoose = require("mongoose");

// Schéma pour les infos personnelles (embed)
const InfoPersonnelleSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  photo: String,
  adresse: {
    adresse1: String,
    adresse2: String,
    pays: String,
    ville: String,
    codePostal: Number,
  }
}, { _id: false });

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }, // One-to-One avec User
  info: InfoPersonnelleSchema, // Données personnelles intégrées
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // One-to-Many avec Task
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }] // Many-to-Many avec Freelance
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
