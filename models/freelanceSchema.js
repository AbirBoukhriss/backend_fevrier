const mongoose = require("mongoose");
const freelanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }, // One-to-One avec User
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }], // Many-to-Many avec Client
   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  competences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Competence" }], // One-to-Many
  certifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certification" }],
  projets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projet" }],
  formations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Formation" }],
  experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }, // Many-to-One
  specialite: { type: mongoose.Schema.Types.ObjectId, ref: "Specialite" }, // Many-to-One
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