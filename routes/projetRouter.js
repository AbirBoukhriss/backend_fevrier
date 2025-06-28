const express = require("express");
const router = express.Router();
const controller = require("../controllers/projetController");

router.post("/addProj", controller.addProjet);
router.get("/allProj", controller.getAllProjets);
router.get("/proj/:id", controller.getProjetById);
router.put("/proj/:id", controller.updateProjet);
router.delete("/proj/:id", controller.deleteProjet);

module.exports = router;
