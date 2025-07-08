const router = require("express").Router();
const controller = require("../controllers/messageController");


router.post("/sendMsg", controller.sendMessage);
router.get("/getMsg", controller.getMessages);
router.get("/getMsg/:id", controller.getMessageById);
router.get("/between/:user1Id/:user2Id", controller.getMessagesBetweenUsers);
router.delete("/deleteMsg/:id", controller.deleteMessage);
router.put("/updateMsg/:id", controller.updateMessage);
router.get("/user/:userId", controller.getMessagesForUser);

module.exports = router;
