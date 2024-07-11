const express = require('express');
const { generatePDFReport, generateCSVReport } = require('../controllers/reports');
const router = express.Router();

// Generate a PDF report
router.post('/pdf', generatePDFReport);

// Generate a CSV report
router.post('/csv', generateCSVReport);

module.exports = router;