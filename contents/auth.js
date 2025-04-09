const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true
  },
  technicalSkills: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  profilePic: {
    type: String,
    required: false 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
