const Note = require("../models/Note");
const asyncHandler = require("../utils/asyncHandler");

// ADD NOTE
exports.addNote = asyncHandler(async (req, res) => {
  const { subject, chapter, title, content } = req.body;

  if (!subject || !chapter || !title || !content) {
    res.status(400);
    throw new Error("Please add all fields for the note");
  }

  const note = await Note.create({
    userId: req.user.id,
    subject,
    chapter, // ✅ SAVE CHAPTER
    title,
    content
  });

  res.status(201).json(note);
});

// GET NOTES BY SUBJECT + CHAPTER
exports.getNotes = asyncHandler(async (req, res) => {
  const { subject, chapter } = req.params;

  const notes = await Note.find({
    userId: req.user.id,
    subject,
    chapter // ✅ FILTER BY CHAPTER
  });

  res.json(notes);
});

// DELETE NOTE
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Ensure the logged in user matches the note user
  if (note.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await note.deleteOne();

  res.json({ id: req.params.id });
});
