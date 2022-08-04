const express = require("express");
const app = express();
const Joi = require("@hapi/joi");

app.use(express.json());

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  year: Joi.number().integer().min(1970).max(2020),
});

app.post("/", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  } else {
    res.json(result);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
