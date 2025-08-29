// routes/freelancerRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addFreelancer,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer
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

router.delete("/:id", deleteFreelancer);

module.exports = router;
