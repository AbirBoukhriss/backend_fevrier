const express = require("express");
const router = express.Router();
const controller = require("../controllers/freelancerController");
router.post("/addFreel", controller.addFreelancer);
router.get("/allFreel", controller.getAllFreelancers);
router.get("/freel/:id", controller.getFreelancerById);
router.put("/freel/:id", controller.updateFreelancer);
router.delete("/freel/:id", controller.deleteFreelancer);

module.exports = router;
