const express = require("express");
const router = express.Router();
const controller = require("../controllers/competenceController");

router.post("/addComp", controller.addCompetence);
router.get("/allComps", controller.getAllCompetences);
router.get("/comp/:id", controller.getCompetenceById);
router.put("/comp/:id", controller.updateCompetence);
router.delete("/comp/:id", controller.deleteCompetence);

module.exports = router;
