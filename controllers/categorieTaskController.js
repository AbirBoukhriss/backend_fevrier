const CategorieTask = require("../models/categorieTaskSchema");

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
