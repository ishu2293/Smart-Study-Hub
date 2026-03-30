const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

exports.addNote = async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    user: req.user._id,
    title,
    content
  });

  res.json(note);
};