const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getFlashcards,
  addFlashcard,
  deleteFlashcard,
  practiceFlashcard
} = require("../controllers/flashcardController");

router.route("/").get(protect, getFlashcards).post(protect, addFlashcard);
router.route("/:id").delete(protect, deleteFlashcard);
router.route("/practice").post(protect, practiceFlashcard);

module.exports = router;