const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
   freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelance" },
   client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }
});

module.exports = mongoose.model("Note", noteSchema);
