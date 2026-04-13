const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getNotes, addNote, deleteNote } = require("../controllers/notesController");

router.get("/:subject/:chapter", protect, getNotes);
router.post("/", protect, addNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;