const Certification = require("../models/certificationSchema");




exports.addCertification = async (req, res) => {
  try {
    const { freelancer, ...certData } = req.body;

    // Vérifier que le freelancer existe
    const exists = await Freelancer.findById(freelancer);
    if (!exists) {
      return res.status(404).json({ message: "Freelancer introuvable" });
    }

    // Créer la certification avec le lien vers le freelancer
    const cert = await Certification.create({ ...certData, freelancer });

    // Ajouter l’ID de la certification dans le tableau du freelancer
    await Freelancer.findByIdAndUpdate(freelancer, {
      $push: { certifications: cert._id }
    });

    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllCertifications = async (req, res) => {
  try {
    const list = await Certification.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCertificationById = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ message: "Certification non trouvée" });
    }
    res.status(200).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);

    if (!cert) {
      return res.status(404).json({ message: "Certification non trouvée" });
    }

    // Supprimer l’ID de la certification du tableau du freelancer
    await Freelancer.findByIdAndUpdate(cert.freelancer, {
      $pull: { certifications: cert._id }
    });

    res.status(200).json({ message: "Certification supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

