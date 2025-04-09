const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  participationLink: {
    type: String,
    required: true,
    match: /^https?:\/\/.+$/, 
  },
  date: {
    type: Date,
    required: true,
  },
  additionalInfo: {
    type: String,
    default: "", 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
