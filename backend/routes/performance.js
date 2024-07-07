const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');

// Get project progress with filters and sorting
router.get('/project-progress', async (req, res) => {
  try {
    const { status, sort } = req.query;

    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    let sortOption = {};
    switch (sort) {
      case 'date':
        sortOption = { startDate: 1 };
        break;
      case 'status':
        sortOption = { status: 1 };
        break;
      default:
        sortOption = { startDate: 1 };
    }

    const projects = await Project.find(query).sort(sortOption).lean();

    const progressData = projects.map(project => ({
      projectTitle: project.title,
      progress: calculateProjectProgress(project) // Implement this function as needed
    }));

    res.json(progressData);
  } catch (error) {
    console.error('Error fetching project progress', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to calculate project progress
const calculateProjectProgress = (project) => {
  // Implement your logic to calculate project progress
  return Math.floor(Math.random() * 100); // Example logic
};

// Get task completion rates
router.get('/task-completion-rates', async (req, res) => {
  try {
    const tasks = await Task.find().lean();

    const taskCompletionRates = tasks.reduce((acc, task) => {
      const status = task.status.toLowerCase();
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});

    res.json(taskCompletionRates);
  } catch (error) {
    console.error('Error fetching task completion rates', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
