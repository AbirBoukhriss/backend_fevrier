const express = require("express");
const router = express.Router();
const controller = require("../controllers/formationController");

router.post("/addFormation", controller.addFormation);
router.get("/allFormations", controller.getAllFormations);
router.get("/formation/:id", controller.getFormationById);
router.put("/formation/:id", controller.updateFormation);
router.delete("/formation/:id", controller.deleteFormation);

module.exports = router;
