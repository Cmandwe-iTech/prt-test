const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: String, ref: "users" },
});

const NotesModel = mongoose.model("notes", NotesSchema);
module.exports = NotesModel;
