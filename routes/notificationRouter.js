const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");

router.post("/addNotif", controller.createNotification);
router.get("/allNotif", controller.getAllNotifications);
router.get("/notif/:id", controller.getNotificationById);
router.delete("/notif/:id", controller.deleteNotification);
router.put("/notif/:id", controller.updateNotification);


module.exports = router;