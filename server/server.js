require("dotenv").config();
var cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4000;
const URI = process.env.URL;
app.listen(PORT, (req, res) => {
  console.log("Server started");
});
app.use("/users", userRouter);
app.use("/api", require("./routes/categoryRouter"));
mongoose
  .connect(URI, {})
  .then(() => {
    console.log("connected to mongodb ");
  })
  .catch(() => {
    console.log("Not connected");
  });
