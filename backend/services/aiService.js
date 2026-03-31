const generateSummaryService = (text) => {
  return text.split(" ").slice(0, 15).join(" ") + "...";
};

const generateFlashcardsService = (text) => {
  const words = text.split(" ").slice(0, 5);

  return words.map(word => ({
    question: `What is ${word}?`,
    answer: `${word} explanation`
  }));
};

module.exports = {
  generateSummaryService,
  generateFlashcardsService
};