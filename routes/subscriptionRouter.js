const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscriptionController");

router.post("/addSub", controller.addSubscription);
router.get("/allSubs", controller.getAllSubscriptions);
router.get("/sub/:id", controller.getSubscriptionById);
router.put("/sub/:id", controller.updateSubscription);
router.delete("/sub/:id", controller.deleteSubscription);

module.exports = router;
