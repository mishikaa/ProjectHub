const Project = require('../models/Project'); // Adjust the path as needed

async function getFileKeyAndName(fileKey) {
  const project = await Project.findOne({ 'attachments.key': fileKey }, { 'attachments.$': 1 });
  if (!project || !project.attachments.length) {
    throw new Error('File not found');
  }

  const file = project.attachments[0];
  return { fileName: file.name, contentType: file.contentType };
}

module.exports = { getFileKeyAndName };
