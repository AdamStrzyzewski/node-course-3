const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express-nowa wartość" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.render("login", { email, password });
});

router.get("/login", (req, res) => {
  res.send("login ale cos poszlo nie tak");
});

module.exports = router;
