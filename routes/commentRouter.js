const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentController");

router.post("/addComment", controller.addComment);
router.get("/allComments", controller.getAllComments);
router.get("/comment/:id", controller.getCommentById);
router.put("/comment/:id", controller.updateComment);
router.delete("/comment/:id", controller.deleteComment);



module.exports = router;
