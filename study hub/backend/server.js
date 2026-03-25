const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/ai", aiRoutes);

// Always last
app.use(errorHandler);