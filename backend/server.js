require("dotenv").config(); // 👈 must be first line

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/flashcards", require("./routes/flashcardRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

