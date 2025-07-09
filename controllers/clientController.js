const Client = require("../models/clientSchema");
const Note = require("../models/noteSchema");
const Task = require("../models/taskSchema");

exports.addClient = async (req, res) => {
  try {
    const { userId, info } = req.body;
    if (!userId || !info) {
      return res.status(400).json({ message: "Champs requis : userId et info" });
    }

    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate("tasks")
      .populate("notes");

    if (!client) return res.status(404).json({ message: "Client introuvable" });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Client introuvable" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Client introuvable" });
    await userModel.updateMany({ client: req.params.id }, { $unset: { client: "" } });
    await Task.deleteMany({ clientId: req.params.id });
    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getClientNotes = async (req, res) => {
  try {
    const notes = await Note.find({ clientId: req.params.clientId }).populate("freelancerId");
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ clientId: req.params.clientId })
      .populate("freelancerId")
      .populate("categorieTaskId");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
