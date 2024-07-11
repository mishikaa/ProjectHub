const {Router} = require('express');
const { default: mongoose } = require('mongoose');

const path = require('path');

const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3 = require('../config/awsConfig');

// const upload = multer({ dest: 'uploads/' });
const router = new Router();

const Project = mongoose.model('project');
const Task = require('../models/Task'); // Adjust the path as needed

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status,
    projectType: req.body.projectType,
    projectRoles: req.body.projectRoles,
    tasks: req.body.tasks,
    attachments: req.file ? req.file.location : null // Storing the file URL
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('tasks')
      .populate({
        path: 'projectRoles.member',
        model: 'users', // Assuming 'User' is the model name for members
        select: 'firstName lastName image' // Select the fields you want to populate for members
      });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all tasks for a given project
router.get('/:projectId/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    .populate('tasks')
    .populate({
      path: 'projectRoles.member',
      model: 'users',
      select: 'firstName lastName displayName image' // Select the fields you want to populate for members
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a project
router.put('/:id', getProject, async (req, res) => {
  if (req.body.title != null) {
    res.project.title = req.body.title;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.project.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.project.endDate = req.body.endDate;
  }
  if (req.body.status != null) {
    res.project.status = req.body.status;
  }
  if (req.body.projectType != null) {
    res.project.projectType = req.body.projectType;
  }
  if (req.body.projectRoles != null) {
    res.project.projectRoles = req.body.projectRoles;
  }
  if (req.body.tasks != null) {
    res.project.tasks = req.body.tasks;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
      

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get project by ID
async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id).populate('tasks').populate('projectRoles.member');
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     acl: 'public-read',
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     }
//   })
// });

// File upload configuration
const upload = multer({
  storage: multer.memoryStorage()
});

router.post('/:id/upload', upload.single('file'), async (req, res) => {
  try {
    const projectId = req.params.id;
    const file = req.file;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + file.originalname,
      Body: file.buffer,
      ACL: 'public-read'
    };

    const upload = new Upload({
      client: s3,
      params: uploadParams
    });

    const data = await upload.done();

    // Save file information to the database and return the file path
    const project = await Project.findById(projectId);
    project.attachments.push(data.Location);
    await project.save();

    res.json({ location: data.Location });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

module.exports = router;