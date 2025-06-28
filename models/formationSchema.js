// models/formationSchema.js
const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  nomEtablissement: String,
  informationExperience: {
    intitule: String,
    date_debut: Date,
    date_fin: Date,
    description: String
  },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }
});

module.exports = mongoose.model("Formation", formationSchema);
