const Task = require("../models/taskSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// ➕ Ajouter une tâche
exports.addTask = async (req, res) => {
  try {
    const { titre, description, date_debut, date_fin, categorie, clientName, skills } = req.body;

    const task = await Task.create({
      titre,
      description,
      date_debut,
      date_fin,
      categorie,
      clientName,
      clientPhoto: req.file ? `/uploads/${req.file.filename}` : null,
      skills: skills ? skills.split(",") : [],
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Récupérer toutes les tâches
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Récupérer les tâches par catégorie
exports.getTasksByCategory = async (req, res) => {
  try {
    const cat = req.params.cat; // ex: "data-scientist"
    const tasks = await Task.find({ categorie: cat });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Récupérer tâche par ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Modifier une tâche
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👍 Like une tâche
exports.likeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    task.likes += 1;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔗 Share une tâche
exports.shareTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    task.shares += 1;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💬 Ajouter un commentaire avec user connecté
exports.addComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // Vérifier le token JWT dans les cookies
    const token = req.cookies.jwt_token_9antra;
    if (!token) return res.status(401).json({ message: "Utilisateur non authentifié" });

    // Décoder le token
    const decoded = jwt.verify(token, "net secret pfe");

    // Récupérer l'utilisateur connecté
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Ajouter commentaire avec username
    task.comments.push({
      user: user.username,
      text: req.body.text,
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
