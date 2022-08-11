const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_SRV;

const app = express();

app.use(express.json());
app.use(cors());

// użycie api
app.use("/api", require("./api"));

app.use((req, res) => {
  res.status(404).json({ message: "404" });
});

app.use((err, req, res, _) => {
  res.status(500).json({ message: err.message });
});

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("db not running", err.toString());
    process.exit();
  });
