const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  projectType: {
    type: String,
    required: true
  },
  projectRoles: [{
    member: {
      type: Schema.Types.ObjectId,
      ref: 'users', // Reference to User model
      required: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'PROJECT_MANAGER', 'TEAM_LEAD', 'DEVELOPER', 'TESTER', 'CLIENT', 'GUEST'],
      required: true
    }
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  attachments: [{
    type: String // URL to the file stored in S3
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('project', ProjectSchema);
