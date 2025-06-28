const mongoose = require("mongoose");
const specialiteSchema = new mongoose.Schema({
  specialite: String,
  freelencer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Freelance" }], 
});

module.exports = mongoose.model("Specialite", specialiteSchema);