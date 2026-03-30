const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  answer: String
});

module.exports = mongoose.model("Flashcard", flashcardSchema);