const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// Définition du schéma
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
    enum: ["admin", "client", "freelancer"],
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  freelance: { type: mongoose.Schema.Types.ObjectId, ref: "Freelance" },
  user_image: { type: String, default: "uploads/client.png" },

  age: { type: Number },
  count: { type: Number, default: 0 },
  etat: Boolean,
  ban: Boolean,
}, {
  timestamps: true
});

// Middleware : hash du mot de passe
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const user = this;
    this.password = await bcrypt.hash(this.password, salt);
    user.etat = false;
    user.ban = true;
    user.count = user.count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

// Log après save
userSchema.post("save", async function (doc) {
  console.log("new user was created & saved successfully");
});

// Méthode statique de login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw new Error("password invalid");
    }
  } else {
    throw new Error("email not found");
  }
};

// Création du modèle et export
const User = mongoose.model("User", userSchema);
module.exports = User;
