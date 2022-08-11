const service = require("../service");

// GET
const get = async (req, res) => {
  const tasks = await service.getAllTasks();
  res.json(tasks);
};

const getSingle = async (req, res, next) => {
  const { id } = req.params;
  const task = await service.getSingleTask(id);
  if (task) {
    res.json(task);
  }
  next();
};

// POST
const post = async (req, res, next) => {
  // create a task
  const { title } = req.body;
  try {
    const result = await service.createTask({ title });
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// delete

const deleteTask = async (req, res, next) => {
  // delete a task
  try {
    const { id } = req.params;
    const r = await service.deleteTask(id);
    res.json(r);
  } catch (e) {
    next(e);
  }
};

const putTask = async (req, res, next) => {
  const { id } = req.params;
  const fields = req.body;
  try {
    const result = await service.updateTask(id, fields);
    if (result) {
      res.json(result);
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

// http://localhost:8155/api/tasks/62f54195f59ce49cdab39573/isDone
const patchTaskIsDone = async (req, res, next) => {
  const { id } = req.params;
  const { isDone } = req.body;
  try {
    const result = await service.updateTask(id, { isDone });
    if (result) {
      res.json(result);
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
  getSingle,
  post,
  deleteTask,
  putTask,
  patchTaskIsDone,
};
