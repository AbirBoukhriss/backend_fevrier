const Notification = require("../models/notificationSchema");
const Message = require("../models/messageSchema");

// Créer une notification
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("messageId")
      .populate("taskId");
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une notification par ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate("messageId")
      .populate("taskId");

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Supprimer la notification
    await Notification.findByIdAndDelete(req.params.id);

    // Vérifier s'il reste d'autres notifications avec ce messageId
    const otherNotifications = await Notification.find({ messageId: notification.messageId });

    // S'il n'en reste pas, supprimer le message
    if (otherNotifications.length === 0) {
      await Message.findByIdAndDelete(notification.messageId);
    }

    res.status(200).json({ message: "Notification (et message si orphelin) supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une notification
exports.updateNotification = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
