const CategorieTask = require("../models/categorieTaskSchema");
const Task = require("../models/taskSchema");
const Notification = require("../models/notificationSchema");

exports.addCategorieTask = async (req, res) => {
  try {
    const cat = await CategorieTask.create(req.body);
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategorieTasks = async (req, res) => {
  try {
    const list = await CategorieTask.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategorieTaskById = async (req, res) => {
  try {
    const categorie = await CategorieTask.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategorieTask = async (req, res) => {
  try {
    const deletedCat = await CategorieTask.findByIdAndDelete(req.params.id);
    if (!deletedCat) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // Supprimer les tâches liées à cette catégorie
    const deletedTasks = await Task.find({ categorieTaskId: req.params.id });
    const taskIds = deletedTasks.map(t => t._id);

    await Task.deleteMany({ categorieTaskId: req.params.id });

    // Supprimer les notifications liées à ces tâches
    await Notification.deleteMany({ taskId: { $in: taskIds } });

    res.status(200).json({ message: "Catégorie et tâches associées supprimées avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};