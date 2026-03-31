<<<<<<< HEAD
=======
require("dotenv").config(); // 👈 must be first line

>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

<<<<<<< HEAD
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
=======
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

>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
