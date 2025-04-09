const mongoose = require('mongoose');

const selfprojectSchema = new mongoose.Schema({
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
    match: /^https:\/\/github\.com\/.+$/ 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('SelfProject', selfprojectSchema);
