const Freelancer = require("../models/freelanceSchema");
const userModel = require("../models/userSchema");


exports.addFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.create(req.body);
    res.status(201).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFreelancers = async (req, res) => {
  try {
    const list = await Freelancer.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id)  .populate([
    "subscription",
    "specialite",
    "experiences",
    "formations",
    "projets",
    "certifications",
    "competences"
  ]);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFreelancer = async (req, res) => {
  try {
    const updated = await Freelancer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFreelancer = async (req, res) => {
  try {
    const deleted = await Freelancer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    await userModel.updateMany({ freelance: deleted._id }, { $unset: { freelance: "" } });
    res.status(200).json({ message: "Freelancer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
