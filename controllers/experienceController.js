const Experience = require("../models/experienceSchema");

exports.addExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json(exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
