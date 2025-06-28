const router = require("express").Router();
const controller = require("../controllers/messageController");

// Envoyer un message
router.post("/sendMsg", controller.sendMessage);

// Récupérer tous les messages
router.get("/getMsg", controller.getMessages);

// Récupérer un message par ID
router.get("/getMsg/:id", controller.getMessageById);

// Récupérer les messages entre deux utilisateurs
router.get("/between/:user1Id/:user2Id", controller.getMessagesBetweenUsers);

// Supprimer un message
router.delete("/deleteMsg/:id", controller.deleteMessage);

// Mettre à jour un message
router.put("/updateMsg/:id", controller.updateMessage);

// Récupérer tous les messages liés à un utilisateur (envoyés ou reçus)
router.get("/user/:userId", controller.getMessagesForUser);

module.exports = router;
