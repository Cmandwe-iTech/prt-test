const express = require("express");
const note_router = express.Router();
const bodyparser = require("body-parser");
const NotesModel = require("../models/notes");
note_router.use(bodyparser.json());

note_router.post("/notes", async (req, res) => {
  try {
    const note = await NotesModel.create({
      title: req.body.title,
      description: req.body.description,
      date: Date.now(),
      user: req.user,
    });
    res.status(200).json({
      status: "success",
      note,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

note_router.get("/notes", async (req, res) => {
  try {
    const note = await NotesModel.find({ user: req.user });
    res.status(200).json({
      status: "success",
      note,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

note_router.put("/notes/:id", async (req, res) => {
  try {
    await NotesModel.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

note_router.post("/notes/:id", async (req, res) => {
  try {
    await NotesModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "deleted successfully...",
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});
module.exports = note_router;
