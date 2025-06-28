const express = require("express");
const router = express.Router();
const controller = require("../controllers/certificationController");

router.post("/addCert", controller.addCertification);
router.get("/allCerts", controller.getAllCertifications);
router.get("/cert/:id", controller.getCertificationById);
router.delete("/cert/:id", controller.deleteCertification);

module.exports = router;
