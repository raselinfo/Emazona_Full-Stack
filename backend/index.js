const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const connectDB = require("./db/db");
const errorMiddleware = require("./middleware/error/errorMiddleware.js");
const { PORT, MONGODB_URI } = require("./config");
const app = express();
// Todo: Cors Install
app.use(cors());
// Todo: Logger
logger(app);

/**
  // Todo: Routes:
 * Seed Products and Users
 * Product Routes
 */
app.use("/api/v1", require("./routes/seedRoutes"));
app.use("/api/v1", require("./routes/productRoutes"));

// Todo: Health Route
app.get("/api/v1/health", (req, res) => {
  res.send("OK");
});

// Todo: Error Middleware
app.use(errorMiddleware);

// Todo: Connect DB
connectDB(MONGODB_URI)
  .then(({ connection: { host, port, name } }) => {
    console.log(`${name} is connect at : ${host}:${port}`);
    app.listen(PORT || 4000, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
