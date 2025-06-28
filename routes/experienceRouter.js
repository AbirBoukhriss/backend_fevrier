const router = require("express").Router();
const ctrl = require("../controllers/experienceController");
router.post("/addExp", ctrl.addExperience);
router.get("/allExp", ctrl.getAllExperiences);
router.get("/exp/:id", ctrl.getExperienceById);
router.put("/exp/:id", ctrl.updateExperience);
router.delete("/exp/:id", ctrl.deleteExperience);
module.exports = router;
