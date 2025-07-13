const Competence = require("../models/competenceSchema");
const Freelancer = require("../models/freelanceSchema");



exports.addCompetence = async (req, res) => {
  try {
    const comp = await Competence.create(req.body);
    res.status(201).json(comp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCompetences = async (req, res) => {
  try {
    const list = await Competence.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCompetenceById = async (req, res) => {
  try {
    const comp = await Competence.findById(req.params.id);
    if (!comp) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.status(200).json(comp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompetence = async (req, res) => {
  try {
    const updated = await Competence.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCompetence = async (req, res) => {
  try {
    const deleted = await Competence.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    await Freelancer.updateMany(
  { competences: req.params.id },
  { $pull: { competences: req.params.id } }
);
    res.status(200).json({ message: "Compétence supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
