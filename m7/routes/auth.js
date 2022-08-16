const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email }, { _id: 1 }).lean(); // null | { _id: ObjectId(XXX) }

  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    await newUser.save();
    res.json("ok");
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "missing credentials" });
  }

  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.validatePassword(password);

  if (!user || !isPasswordCorrect) {
    return res.status(401).json({ message: "wrong credentials" });
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  res.json({ token });
});

module.exports = router;
