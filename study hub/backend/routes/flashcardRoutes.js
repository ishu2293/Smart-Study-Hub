const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getFlashcards,
  addFlashcard
} = require("../controllers/flashcardController");

router.get("/", protect, getFlashcards);
router.post("/", protect, addFlashcard);

module.exports = router;