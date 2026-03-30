const Flashcard = require("../models/Flashcard");

exports.getFlashcards = async (req, res) => {
  const cards = await Flashcard.find({ user: req.user._id });
  res.json(cards);
};

exports.addFlashcard = async (req, res) => {
  const { question, answer } = req.body;

  const card = await Flashcard.create({
    user: req.user._id,
    question,
    answer
  });

  res.json(card);
};