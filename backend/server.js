require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/flashcards", require("./routes/flashcardRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/ai", require("./routes/aiRoutes")); // chatbot

const path = require("path");

// ✅ Serve Static Frontend Files
app.use(express.static(path.join(__dirname, "../fronted")));

// ✅ Default route to redirect to the frontend index.html
app.get("/", (req, res) => {
  res.redirect("/pages/index.html");
});

// ✅ Error Handler (LAST)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ✅ Start Server (ONLY ONCE)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});