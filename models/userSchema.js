const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "client", "Freelancer"]
  },
  user_image: { type: String, required: false, default: "client.png" },
  count: { type: Number, default: 0 },
  etat: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Hashage du mot de passe
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.count += 1;
    next();
  } catch (error) {
    next(error);
  }
});

// Log après l'enregistrement
userSchema.post("save", function () {
  console.log("new user was created & saved successfully");
});

const User = mongoose.model("User", userSchema);
module.exports = User;
