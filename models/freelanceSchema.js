// models/freelanceSchema.js
const mongoose = require("mongoose");

const freelanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, unique: true, sparse: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  competences: [String],
  certifications: [String],
  projets: [String],
  formations: [String],
  experiences: [String],
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  specialite: String,
  cv: { type: String },
  info: {
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
      codePostal: Number
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Freelance", freelanceSchema);
