// models/experienceSchema.js
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  nomEntreprise: String,
  informationExperience: {
    intitule: String,
    date_debut: Date,
    date_fin: Date,
    description: String
  },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }
});

module.exports = mongoose.model("Experience", experienceSchema);
