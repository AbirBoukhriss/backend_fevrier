const express = require("express");
const router = express.Router();
const { addNotte, getFreelancerNottes } = require("../controllers/notteController");
const { requireAuthUser } = require("../middlewares/requireAuthUser");

// Ajouter une note (protégée par auth)
router.post("/", requireAuthUser, addNotte);

// Récupérer toutes les notes d’un freelancer
router.get("/:freelancerId", getFreelancerNottes);

module.exports = router;
