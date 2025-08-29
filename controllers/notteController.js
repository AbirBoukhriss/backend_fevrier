const Notte = require("../models/notteSchema");

// ✅ Ajouter une note
exports.addNotte = async (req, res) => {
  try {
    const { freelancerId, rating, comment } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const clientId = req.session.user._id;

    const newNotte = await Notte.create({
      freelancerId,
      clientId,
      rating,
      comment,
    });

    let savedNotte = await Notte.findById(newNotte._id)
      .populate("clientId", "username user_image");

    // ✅ Corriger le chemin de la photo
    if (savedNotte.clientId?.user_image) {
      const img = savedNotte.clientId.user_image;

      if (img.startsWith("uploads/")) {
        savedNotte.clientId.user_image = `/${img}`;
      } else {
        savedNotte.clientId.user_image = `/uploads/${img}`;
      }
    } else {
      savedNotte.clientId.user_image = null;
    }

    res.status(201).json(savedNotte);
  } catch (err) {
    console.error("Erreur addNotte:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Récupérer toutes les notes d’un freelancer
exports.getFreelancerNottes = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    let nottes = await Notte.find({ freelancerId })
      .sort({ createdAt: -1 })
      .populate("clientId", "username user_image");

    // ✅ Ajouter le bon chemin pour chaque photo
    nottes = nottes.map(n => {
      if (n.clientId?.user_image) {
        const img = n.clientId.user_image;

        if (img.startsWith("uploads/")) {
          n.clientId.user_image = `/${img}`;
        } else {
          n.clientId.user_image = `/uploads/${img}`;
        }
      } else {
        n.clientId.user_image = null;
      }
      return n;
    });

    res.json(nottes);
  } catch (err) {
    console.error("Erreur getFreelancerNottes:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
