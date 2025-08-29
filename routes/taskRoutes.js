const express = require("express");
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/taskController");
const { requireAuthUser } = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ➕ Ajouter une tâche
router.post("/addTask", upload.single("clientPhoto"), controller.addTask);

// CRUD
router.get("/allTsk", controller.getAllTasks);
router.get("/gettsk/:id", controller.getTaskById);
router.put("/update/:id", controller.updateTask);
router.delete("/delete/:id", controller.deleteTask);

// 👍 Like & 🔗 Share
router.post("/like/:id", controller.likeTask);
router.post("/share/:id", controller.shareTask);

// 💬 Commentaire (protégé)
router.post("/comment/:id", requireAuthUser, controller.addComment);
router.get("/categorie/:cat", controller.getTasksByCategory);

module.exports = router;
