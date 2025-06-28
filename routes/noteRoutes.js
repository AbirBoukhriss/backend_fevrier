const express = require("express");
const router = express.Router();
const controller = require("../controllers/noteController");

router.post("/addNote", controller.addNote);
router.get("/allNotes", controller.getAllNotes);
router.get("/note/:id", controller.getNoteById);
router.put("/note/:id", controller.updateNote);
router.delete("/note/:id", controller.deleteNote);



module.exports = router;
