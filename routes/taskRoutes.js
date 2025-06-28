const router = require("express").Router();
const controller = require("../controllers/taskController");


router.post("/addTsk", controller.addTask);
router.get("/allTsk", controller.getAllTasks);
router.get("/gettsk/:id", controller.getTaskById);
router.put("/update/:id", controller.updateTask);
router.delete("/delete/:id", controller.deleteTask);
router.get("/freelancer/:freelancerId/tasks", controller.getTasksByFreelancer);
router.get("/client/:clientId/tasks", controller.getTasksByClient);

module.exports = router;
