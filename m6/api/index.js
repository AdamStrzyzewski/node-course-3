const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks");

router.get("/tasks", taskController.get);
router.get("/tasks/:id", taskController.getSingle);
router.post("/tasks", taskController.post);
router.delete("/tasks/:id", taskController.deleteTask);
router.put("/tasks/:id", taskController.putTask);
router.patch("/tasks/:id/isDone", taskController.patchTaskIsDone);

module.exports = router;
