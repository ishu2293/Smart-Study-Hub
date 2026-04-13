const Note = require("../models/Note");
const Flashcard = require("../models/Flashcard");
const Progress = require("../models/Progress");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get dashboard summary for user
// @route   GET /api/dashboard
// @access  Private
exports.getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // 1. Total Notes & grouped notes
  const allNotes = await Note.find({ userId }).sort({ createdAt: -1 });
  const totalNotes = allNotes.length;
  
  const notesOverview = {};
  allNotes.forEach(note => {
      const subj = note.subject || "General";
      if (!notesOverview[subj]) notesOverview[subj] = [];
      notesOverview[subj].push({
          title: note.title,
          chapter: note.chapter,
          content: note.content,
          date: note.createdAt
      });
  });

  // 2. Total Flashcards
  const totalFlashcards = await Flashcard.countDocuments({ userId });

  // 3. Progress Data
  const progressData = await Progress.find({ userId });

  // Calculate weak topics
  const weakTopics = progressData
    .filter(p => {
      const total = p.correctAnswers + p.wrongAnswers;
      if (total === 0) return false;
      const correctPercentage = (p.correctAnswers / total) * 100;
      return p.wrongAnswers > p.correctAnswers || correctPercentage < 50;
    })
    .map(p => ({
      subject: p.subject,
      correctAnswers: p.correctAnswers,
      wrongAnswers: p.wrongAnswers,
      lastPracticed: p.lastPracticed
    }));

  res.json({
    totalNotes,
    notesOverview,
    totalFlashcards,
    progressSummary: progressData.map(p => ({
      subject: p.subject,
      correct: p.correctAnswers,
      wrong: p.wrongAnswers,
      total: p.correctAnswers + p.wrongAnswers
    })),
    weakTopics
  });
});
