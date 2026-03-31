// ADD NOTE
exports.addNote = async (req, res) => {
  const { subject, chapter, title, content } = req.body;

  const note = await Note.create({
    userId: req.user.id,
    subject,
    chapter, // ✅ SAVE CHAPTER
    title,
    content
  });

  res.json(note);
};

// GET NOTES BY SUBJECT + CHAPTER
exports.getNotes = async (req, res) => {
  const { subject, chapter } = req.params;

  const notes = await Note.find({
    userId: req.user.id,
    subject,
    chapter // ✅ FILTER BY CHAPTER
  });

  res.json(notes);
};
