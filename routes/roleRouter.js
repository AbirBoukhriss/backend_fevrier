const express = require("express");
const router = express.Router();
const controller = require("../controllers/roleController");

router.post("/addRole", controller.createRole);
router.get("/allRoles", controller.getAllRoles);
router.get("/role/:id", controller.getRoleById);
router.put("/role/:id", controller.updateRole);
router.delete("/role/:id", controller.deleteRole);

module.exports = router;
