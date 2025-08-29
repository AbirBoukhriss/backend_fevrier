// controllers/freelancerController.js
const Freelancer = require("../models/freelanceSchema");
const userModel = require("../models/userSchema");

// Helper
const parseArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(",").map(v => v.trim()).filter(Boolean);
};

// Ajouter un freelancer
exports.addFreelancer = async (req, res) => {
  try {
    const { body, files } = req;

    // ✅ On récupère le userId (depuis le body – vous pouvez aussi le prendre du JWT si vous avez un middleware)
    const userId = body.userId || null;
    if (!userId) {
      return res.status(400).json({ message: "userId manquant" });
    }

    // ✅ Bloquer la création si un freelancer existe déjà pour ce user
    const existing = await Freelancer.findOne({ userId });
   

    const newFreelancer = new Freelancer({
      userId,
      competences: parseArray(body.competences),
      experiences: parseArray(body.experiences),
      certifications: parseArray(body.certifications),
      formations: parseArray(body.formations),
      projets: parseArray(body.projets),
      specialite: body.specialite,
      info: {
        nom: body.nom,
        prenom: body.prenom,
        email: body.email,
        photo: files?.photo ? `/uploads/photos/${files.photo[0].filename}` : null
      },
      cv: files?.cv ? `/uploads/cv/${files.cv[0].filename}` : null
    });

    const savedFreelancer = await newFreelancer.save();
    res.status(201).json(savedFreelancer);
  } catch (error) {
    console.error("Erreur dans addFreelancer :", error);
    // En cas de collision d'index unique
    if (error.code === 11000) {
      return res.status(400).json({ message: "Cet utilisateur a déjà un profil freelancer." });
    }
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous (on évite les entrées réellement vides)
exports.getAllFreelancers = async (req, res) => {
  try {
    const list = await Freelancer.find({
      $or: [
        { userId: { $ne: null } },
        { "info.nom": { $exists: true, $ne: "" } },
        { "info.prenom": { $exists: true, $ne: "" } },
        { specialite: { $exists: true, $ne: "" } },
        { cv: { $exists: true, $ne: null } },
        { "info.photo": { $exists: true, $ne: null } },
        { competences: { $exists: true, $ne: [] } },
        { formations: { $exists: true, $ne: [] } },
        { experiences: { $exists: true, $ne: [] } },
        { certifications: { $exists: true, $ne: [] } }
      ]
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer par ID
exports.getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateFreelancer = async (req, res) => {
  try {
    const { body, files } = req;
    let updatedData = { ...body };

    if (files?.cv) updatedData.cv = `/uploads/cv/${files.cv[0].filename}`;
    if (files?.photo) updatedData["info.photo"] = `/uploads/photos/${files.photo[0].filename}`;

    ["competences", "experiences", "certifications", "formations", "projets"].forEach(field => {
      if (updatedData[field]) updatedData[field] = parseArray(updatedData[field]);
    });

    const updated = await Freelancer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updated) return res.status(404).json({ message: "Freelancer not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteFreelancer = async (req, res) => {
  try {
    const deleted = await Freelancer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Freelancer not found" });

    await userModel.updateMany({ freelance: deleted._id }, { $unset: { freelance: "" } });
    res.status(200).json({ message: "Freelancer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
