const router = require("express").Router();
const ctrl = require("../controllers/categorieTaskController");

router.post("/addCategorie", ctrl.addCategorieTask);
router.get("/allCategories", ctrl.getAllCategorieTasks);
router.get("/:id", ctrl.getCategorieTaskById);

module.exports = router;
