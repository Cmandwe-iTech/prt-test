const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const reg_router = require("./routes/login");
const note_router = require("./routes/notes_route");
const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://contact:manager@cluster0.zijr4xf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to db"));
app.use("/notes", (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded.data;
      next();
    } else {
      res.status(401).json({
        status: "failed",
        message: "token is missing",
      });
    }
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: e.message,
    });
  }
});
app.use("/", reg_router);
app.use("/", note_router);
app.listen(port, () => {
  console.log(`port is on ${port}`);
});
