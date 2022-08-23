const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = new express();

app.use(express.json());

app.use("/", require("./routes"));

const connection = mongoose.connect(process.env.DB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000).on("listening", () => {
      console.log("running app");
    });
  })
  .catch((err) => {
    console.log("server not running");
  });

require("dotenv").config();
