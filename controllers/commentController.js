const Comment = require("../models/commentSchema");
const Freelancer = require("../models/freelanceSchema");



exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    await Freelancer.updateMany(
  { comments: req.params.id },
  { $pull: { comments: req.params.id } }
);

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


