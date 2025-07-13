const mongoose = require("mongoose");
const certificationSchema = new mongoose.Schema({
  intitule: String,
  date_obtention: Date,
  file: String,
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer",  required: true }
});

module.exports = mongoose.model("Certification", certificationSchema);