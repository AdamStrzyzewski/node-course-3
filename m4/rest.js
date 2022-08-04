const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
// cross-origin resource sharing
app.use(cors({ origin: ["http://localhost:3001"], methods: "GET" }));

const tasks = [{ id: 1, title: "Go to work", text: "just do it", done: false }];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const task = tasks.find((el) => el.id === parseInt(id, 10));
  if (!task) {
    next();
  } else {
    res.json(task);
  }
});

app.post("/tasks", (req, res) => {
  const { title, text } = req.body;
  const task = {
    id: (tasks?.[tasks.length - 1]?.id ?? 0) + 1,
    title,
    text,
    done: false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch("/tasks/:id/status", (req, res) => {
  let { id } = req.params;
  const { done } = req.body;
  id = parseInt(id, 10);

  const task = tasks.find((el) => el.id === id);
  task.done = done;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const taskIndex = tasks.findIndex((el) => el.id === id);
  tasks.splice(taskIndex, 1);
  res.status(204).json();
});

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
