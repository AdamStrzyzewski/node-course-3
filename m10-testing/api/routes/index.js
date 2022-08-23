const { Router } = require("express");
const User = require("../models/User");

const router = Router();

const helloWorld = (req, res) => {
  res.send("hello world");
};

const hello = (req, res) => {
  const name = req.params.name ?? "world";
  res.send(`hello ${name}`);
};

router.get("/hello", helloWorld);
router.get("/hello-you/:name", hello);
router.get("/hello-you", hello);

router.post("/users", async (req, res) => {
  await User.create(req.body);
  res.status(201).json({ message: "created" });
});

router.get("/users", async (req, res) => {
  let { page = 1, perPage = 10 } = req.query;
  page = parseInt(page, 10);
  perPage = parseInt(perPage, 10);

  const users = await User.find({})
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  res.json(users);
});

router.delete("/users", async (req, res) => {
  // throw new Error("someone broke this");
  await User.deleteMany({});
  res.status(204).send();
});

module.exports = router;
