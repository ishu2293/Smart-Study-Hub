const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: String,
  completedTopics: [String],
  progressPercentage: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);