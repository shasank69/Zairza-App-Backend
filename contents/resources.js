const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  youtubeLink: {
    type: String,
    match: /^https:\/\/(www\.)?youtube\.com\/.+$/, 
    required: false,
  },
  websiteLink: {
    type: String,
    match: /^https?:\/\/.+$/, 
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);
