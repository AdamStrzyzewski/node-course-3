const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST: dbURI } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes"));

require("./config/passport");
// /api/auth/register

const connection = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Our server is running");
    });
  })
  .catch((err) => {
    console.log("server is not running", err);
    process.exit(1);
  });

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    message: err.message,
  });
});
// const jwt = require("jsonwebtoken");

// const payload = { id: 2412, username: "Adam", email: "adam@test.pl" };
// const secret =
//   "ijfo23gioj23gG#@GSGSGjifsdji$@#DSFGSDlg;fdspg[32R@#FSGSDFGS@#R@#RF#EWFA";

// const token = jwt.sign(payload, secret, { expiresIn: "10s" });
// setTimeout(() => {
//   try {
//     const payload = jwt.verify(token, secret);
//     console.log("verify", payload);
//   } catch (e) {
//     console.log(e);
//   }
// }, 1000 * 11);
