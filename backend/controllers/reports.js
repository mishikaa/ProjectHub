const PdfPrinter = require('pdfmake');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

// Load Roboto fonts
const fonts = {
  Roboto: {
    normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '../fonts/Roboto-Bold.ttf'),
    italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '../fonts/Roboto-BoldItalic.ttf')
  }
};

// Function to generate a PDF report
const generatePDFReport = async (req, res) => {
  const { filters, criteria } = req.body;

  // Fetch data based on filters
  const projects = await Project.find(filters).lean();

  // Process data based on criteria
  let reportContent = 'No specific calculation provided';
  if (criteria === 'completionRate') {
    const completedTasks = projects.reduce((acc, project) => acc + project.tasks.filter(task => task.status === 'Completed').length, 0);
    const totalTasks = projects.reduce((acc, project) => acc + project.tasks.length, 0);
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    reportContent = `Completion Rate: ${completionRate.toFixed(2)}%`;
  }

  const docDefinition = {
    content: [
      { text: 'Project Management Report', style: 'header' },
      { text: `Filters: ${JSON.stringify(filters)}`, style: 'subheader' },
      { text: `Criteria: ${criteria}`, style: 'subheader' },
      { text: reportContent, style: 'body' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*'],
          body: [
            ['Project Title', 'Start Date', 'End Date', 'Status'],
            ...projects.map(project => [
              project.title,
              project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A',
              project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A',
              project.status
            ])
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true, margin: [0, 15, 0, 5] },
      body: { fontSize: 12, margin: [0, 5, 0, 15] }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="project_report.pdf"');

  pdfDoc.pipe(res);
  pdfDoc.end();
};

// Function to generate a CSV report
const generateCSVReport = async (req, res) => {
  const { filters, criteria } = req.body;

  // Fetch data based on filters
  const projects = await Project.find(filters).lean();

  // Process data based on criteria
  let reportContent = [];
  if (criteria === 'completionRate') {
    const completedTasks = projects.reduce((acc, project) => acc + project.tasks.filter(task => task.status === 'Completed').length, 0);
    const totalTasks = projects.reduce((acc, project) => acc + project.tasks.length, 0);
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    reportContent.push({ filter: 'Completion Rate', criteria: `${completionRate.toFixed(2)}%`, data: '' });
  }

  projects.forEach(project => {
    reportContent.push({
      filter: JSON.stringify(filters),
      criteria: criteria,
      data: `Project: ${project.title}, Start Date: ${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}, End Date: ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}, Status: ${project.status}`
    });
  });

  const csvWriter = createCsvWriter({
    path: 'project_report.csv',
    header: [
      { id: 'filter', title: 'Filter' },
      { id: 'criteria', title: 'Criteria' },
      { id: 'data', title: 'Data' }
    ]
  });

  csvWriter
    .writeRecords(reportContent)
    .then(() => {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="project_report.csv"');

      const readStream = fs.createReadStream('project_report.csv');
      readStream.pipe(res);
    })
    .catch((error) => {
      console.error('Error generating CSV report:', error);
      res.status(500).json({ error: 'Failed to generate CSV report' });
    });
};

module.exports = {
  generatePDFReport,
  generateCSVReport
};
