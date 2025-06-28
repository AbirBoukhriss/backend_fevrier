const Formation = require("../models/formationSchema");


exports.addFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json(formation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllFormations = async (req, res) => {
  try {
    const list = await Formation.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateFormation = async (req, res) => {
  try {
    const updated = await Formation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFormation = async (req, res) => {
  try {
    const deleted = await Formation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.status(200).json({ message: "Formation supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
