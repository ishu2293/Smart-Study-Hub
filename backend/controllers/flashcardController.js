const Flashcard = require("../models/Flashcard");
const Progress = require("../models/Progress");
const asyncHandler = require("../utils/asyncHandler");

exports.getFlashcards = asyncHandler(async (req, res) => {
  const cards = await Flashcard.find({ userId: req.user._id });
  res.json(cards);
});

exports.addFlashcard = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    res.status(400);
    throw new Error("Please add question and answer");
  }

  const card = await Flashcard.create({
    userId: req.user._id,
    question,
    answer
  });

  res.status(201).json(card);
});

exports.deleteFlashcard = asyncHandler(async (req, res) => {
  const card = await Flashcard.findById(req.params.id);

  if (!card) {
    res.status(404);
    throw new Error("Flashcard not found");
  }

  if (card.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await card.deleteOne();
  res.json({ id: req.params.id });
});

exports.practiceFlashcard = asyncHandler(async (req, res) => {
  const { isCorrect, subject } = req.body;

  if (isCorrect === undefined || !subject) {
    res.status(400);
    throw new Error("Please provide isCorrect (boolean) and subject");
  }

  let progress = await Progress.findOne({ userId: req.user.id, subject });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user.id,
      subject,
      correctAnswers: isCorrect ? 1 : 0,
      wrongAnswers: isCorrect ? 0 : 1,
      lastPracticed: Date.now()
    });
  } else {
    if (isCorrect) {
      progress.correctAnswers += 1;
    } else {
      progress.wrongAnswers += 1;
    }
    progress.lastPracticed = Date.now();
    await progress.save();
  }

  res.json(progress);
});