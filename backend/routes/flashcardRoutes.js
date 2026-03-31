const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getFlashcards,
  addFlashcard
<<<<<<< HEAD
} = require("../controllers/flashcardController");
=======
} = require("../controllers/flashcardContoller");
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612

router.get("/", protect, getFlashcards);
router.post("/", protect, addFlashcard);

module.exports = router;