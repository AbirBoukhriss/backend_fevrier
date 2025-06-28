const mongoose = require("mongoose");
const categorieTaskSchema = new mongoose.Schema({
  category: String,
   tasks:[{type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("CategorieTask", categorieTaskSchema);