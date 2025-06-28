const router = require("express").Router();
const controller = require("../controllers/clientController");

router.post("/addClient", controller.addClient);
router.get("/allClients", controller.getAllClients);
router.get("/:id", controller.getClientById);
router.put("/update/:id", controller.updateClient);
router.delete("/delete/:id", controller.deleteClient);

// Relations supplémentaires :
router.get("/:clientId/notes", controller.getClientNotes);
router.get("/:clientId/tasks", controller.getClientTasks);

module.exports = router;
