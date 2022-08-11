const Task = require("./schemas/tasks");

const getAllTasks = () => Task.find({}).lean();

const getSingleTask = (id) => Task.findOne({ _id: id }).lean();

const createTask = ({ title }) => Task.create({ title });

// const deleteTask = (id) => Task.deleteOne({ _id: id });
const deleteTask = (id) => Task.findByIdAndRemove(id);

const updateTask = (id, fields) =>
  Task.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: fields,
    },
    { new: true, strict: "throw", runValidators: true }
  );

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};
