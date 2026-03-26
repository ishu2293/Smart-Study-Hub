const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/notesController");

router.get("/", protect, getNotes);
router.post("/", protect, addNote);

module.exports = router;