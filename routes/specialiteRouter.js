const express = require("express");
const router = express.Router();
const controller = require("../controllers/specialiteController");

router.post("/addSpec", controller.addSpecialite);
router.get("/allSpecs", controller.getAllSpecialites);
router.get("/spec/:id", controller.getSpecialiteById);
router.put("/spec/:id", controller.updateSpecialite);
router.delete("/spec/:id", controller.deleteSpecialite);

module.exports = router;
