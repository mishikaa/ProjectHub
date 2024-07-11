const express = require('express');
const Project = require('../models/Project'); // Adjust based on your project structure
const router = express.Router();

// Define the search route
router.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    // Execute the search query using the appropriate model
    const results = await Project.find({ $text: { $search: query } }).lean(); // Replace "Project" with your project model

    // Return the search results as the response
    res.json({ results });
  } catch (error) {
    // Handle any errors that occur during the search
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'An error occurred during the search' });
  }
});

module.exports = router;
