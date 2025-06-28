const Certification = require("../models/certificationSchema");


exports.addCertification = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
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
    const deleted = await Certification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Certification non trouvée" });
    }
    res.status(200).json({ message: "Certification supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
