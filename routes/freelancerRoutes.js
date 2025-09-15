// routes/freelancerRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Freelancer = require("../models/freelanceSchema");

const {
  addFreelancer,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
  getFreelancerByUserId 
} = require("../controllers/freelancerController");

const router = express.Router();

// 📂 Création auto des dossiers
const cvDir = path.join(__dirname, "..", "uploads", "cv");
const photoDir = path.join(__dirname, "..", "uploads", "photos");

[cvDir, photoDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 📂 Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cv") cb(null, cvDir);
    else if (file.fieldname === "photo") cb(null, photoDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🚀 Routes
router.post("/add", upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "photo", maxCount: 1 }
]), addFreelancer);

router.get("/allFreel", getAllFreelancers);
router.get("/:id", getFreelancerById);

router.put("/:id", upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "photo", maxCount: 1 }
]), updateFreelancer);
router.get("/user/:userId",getFreelancerByUserId);
router.delete("/:id", deleteFreelancer);
// récupérer par userId
const mongoose = require("mongoose");

// ✅ Nouvelle route : récupérer freelancer par userId
// ✅ Nouvelle route : récupérer freelancer par userId
router.get("/byUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Forcer le cast en ObjectId et récupérer le + récent
    const freelancer = await Freelancer.findOne({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 }) // 👈 prend le freelancer le plus récent
      .populate("userId", "username email phone address user_image");

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer non trouvé pour ce userId" });
    }

    console.log("📌 Freelancer trouvé :", freelancer);
    res.status(200).json(freelancer);
  } catch (err) {
    console.error("❌ Erreur serveur :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});


module.exports = router;
