const express = require('express');
const Inventory = require('../contents/inventory.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const { componentName, quantity } = req.body;

  try {
    const newComponent = new Inventory({ componentName, quantity });
    await newComponent.save();
    res.status(201).json({ message: 'Component added successfully', component: newComponent });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add component', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const components = await Inventory.find().sort({ componentName: 1 });
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

router.get('/:componentName', async (req, res) => {
  try {
    const component = await Inventory.findById(req.params.componentName);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    res.json(component);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching component' });
  }
});

router.put('/:componentName', async (req, res) => {
  try {
    const updatedComponent = await Inventory.findByIdAndUpdate(req.params.componentName, req.body, { new: true, runValidators: true });
    if (!updatedComponent) return res.status(404).json({ error: 'Component not found' });
    res.json({ message: 'Component updated', component: updatedComponent });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update component', details: err.message });
  }
});

router.delete('/:componentName', async (req, res) => {
  try {
    const deletedComponent = await Inventory.findByIdAndDelete(req.params.componentName);
    if (!deletedComponent) return res.status(404).json({ error: 'Component not found' });
    res.json({ message: 'Component deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting component' });
  }
});

module.exports = router;
