const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  chapter: String,
  title: String,
  content: String
});

module.exports = mongoose.model("Note", noteSchema);