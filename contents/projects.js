const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String], 
    required: true,
  },
  contributors: {
    type: [String], 
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
    match: /^https:\/\/github\.com\/.+$/ // Optional: validate it's a GitHub link
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Project', projectSchema);
