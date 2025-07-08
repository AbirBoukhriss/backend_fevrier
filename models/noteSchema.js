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
    ref: "Freelance", 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", noteSchema);
