const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  categorie: { type: String, required: true },
  clientName: { type: String, required: true },
  clientPhoto: { type: String, default: null },

  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },

  comments: [
    {
      user: { type: String, required: true }, // Nom complet de l’utilisateur connecté
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  skills: { type: [String], default: [] },
});

module.exports = mongoose.model("Task", taskSchema);
