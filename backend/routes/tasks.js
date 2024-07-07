const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Adjust the path as needed
const Project = require('../models/Project');

// Create a new task
router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    const task = new Task(req.body);
    // console.log(task.projectId)
    await task.save();

    const project = await Project.findByIdAndUpdate(task.projectId, { $push: { tasks: task._id } });
    
    if (!project) {
      // console.log("here")
      await Task.findByIdAndDelete(task._id); // Rollback task creation if project not found
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task by ID
router.delete('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: task._id } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a task by ID
router.put('/:taskId', async (req, res) => {
  try {
    const existingTask = await Task.findById(req.params.taskId);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the project ID has changed
    const oldProjectId = existingTask.projectId;
    const newProjectId = req.body.projectId;

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true, runValidators: true });
    
    if (oldProjectId.toString() !== newProjectId.toString()) {
      // Remove task ID from the old project
      await Project.findByIdAndUpdate(oldProjectId, { $pull: { tasks: existingTask._id } });
      // Add task ID to the new project
      const newProject = await Project.findByIdAndUpdate(newProjectId, { $push: { tasks: existingTask._id } });
      if (!newProject) {
        return res.status(404).json({ message: 'New project not found' });
      }
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
