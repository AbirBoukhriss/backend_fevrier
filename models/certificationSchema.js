const mongoose = require("mongoose");
const certificationSchema = new mongoose.Schema({
  intitule: String,
  date_obtention: Date,
  file: String,
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }
});

module.exports = mongoose.model("Certification", certificationSchema);