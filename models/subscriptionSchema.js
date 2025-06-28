const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  titre: String,
  description: String,
  datedebut : Date,
  prix: Number,
  duree: Number,
  freelencer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Freelance" }],  // en jours ou mois selon l'application
});

module.exports = mongoose.model("Subscription", subscriptionSchema);