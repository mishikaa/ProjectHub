const Task = require('../models/Task');

// Controller methods
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  const taskData = req.body;
  try {
    const newTask = await Task.create(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const taskData = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
