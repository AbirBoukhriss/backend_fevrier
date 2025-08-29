const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageReelController");

router.get("/:userId/:receiverId", messageController.getMessages);

module.exports = router;
