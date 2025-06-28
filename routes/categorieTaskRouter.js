const router = require("express").Router();
const ctrl = require("../controllers/categorieTaskController");

router.post("/addCTask", ctrl.addCategorieTask);
router.get("/allCTask", ctrl.getAllCategorieTasks);

module.exports = router;