const Projet = require("../models/projetSchema");
const Freelancer = require("../models/freelanceSchema");


exports.addProjet = async (req, res) => {
  try {
    const { freelancer, ...projetData } = req.body;

    const exists = await Freelancer.findById(freelancer);
    if (!exists) {
      return res.status(404).json({ message: "Freelancer introuvable" });
    }

    const projet = await Projet.create({ ...projetData, freelancer });

    await Freelancer.findByIdAndUpdate(freelancer, {
      $push: { projets: projet._id }
    });

    res.status(201).json(projet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllProjets = async (req, res) => {
  try {
    const list = await Projet.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProjetById = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.status(200).json(projet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProjet = async (req, res) => {
  try {
    const updated = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProjet = async (req, res) => {
  try {
    const deleted = await Projet.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    await Freelancer.findByIdAndUpdate(deleted.freelancer, {
      $pull: { projets: deleted._id }
    });

    res.status(200).json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
