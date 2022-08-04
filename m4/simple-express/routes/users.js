const express = require("express");
const router = express.Router();

const users = [
  { id: "1", username: "Felix", surname: "Brown", email: "felix@test.com" },
  { id: "2", username: "Sonya", surname: "Redhead", email: "sonya@test.com" },
  { id: "3", username: "Conan", surname: "Barbarian", email: "conan@test.com" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", { users });
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const user = users.filter((el) => el.id === id);

  if (!user.length) {
    return res.render("error", {
      message: "not found",
      error: { status: "404", stack: "of bills" },
    });
  }
  return res.render("user", ...user);
});

module.exports = router;
