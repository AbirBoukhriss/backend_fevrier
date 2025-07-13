const Specialite = require("../models/specialiteSchema");
const Freelancer = require("../models/freelanceSchema");


exports.addSpecialite = async (req, res) => {
  try {
    const spec = await Specialite.create(req.body);
    res.status(201).json(spec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSpecialites = async (req, res) => {
  try {
    const list = await Specialite.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSpecialiteById = async (req, res) => {
  try {
    const spec = await Specialite.findById(req.params.id);
    if (!spec) {
      return res.status(404).json({ message: "Specialité non trouvée" });
    }
    res.status(200).json(spec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSpecialite = async (req, res) => {
  try {
    const updated = await Specialite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Specialité non trouvée" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteSpecialite = async (req, res) => {
  try {
    const deleted = await Specialite.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Specialité non trouvée" });
    }
    await Freelancer.updateMany({ specialite: req.params.id }, { $unset: { specialite: "" } });

    res.status(200).json({ message: "Specialité supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
