const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const { default: rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { watchEvents } = require("./dto/contract.information");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const runAsync = async () => {
  await connectDB();
  await watchEvents();

  let countdown = 180 * 60 * 1000;

  setInterval(() => {
    mongoose.connection.db.dropCollection("transactions");
  }, countdown);
};

runAsync();

const app = express();

app.use(cors({ credentials: true, origin: true })); //['http://localhost:3000', 'https://www.google.com/', 'https://opensea.io/']})) //{origin: ['http://localhost:3000', 'https://opensea.io/']}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/collection", require("./routes/collectionRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
