const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subject: { type: String, required: true },
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
  lastPracticed: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);