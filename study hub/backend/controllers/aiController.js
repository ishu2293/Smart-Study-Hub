exports.generateSummary = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  // Dummy summary logic
  const summary = text.split(" ").slice(0, 20).join(" ") + "...";

  res.json({ summary });
};

exports.generateFlashcards = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  // Dummy flashcard logic
  const words = text.split(" ").slice(0, 5);

  const flashcards = words.map((word, index) => ({
    question: `Explain: ${word}`,
    answer: `Definition of ${word}`
  }));

  res.json({ flashcards });
};