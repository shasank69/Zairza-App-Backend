const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  componentName: {
    type: String,
    required: true,
    unique: true 
  },
  quantity: {
    type: Number,
    required: true,
    min: 0 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
