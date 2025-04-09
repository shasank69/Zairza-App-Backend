const express = require('express');
const Resource = require('../contents/resources.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const { domain, level, youtubeLink, websiteLink } = req.body;

  try {
    const newResource = new Resource({ domain, level, youtubeLink, websiteLink });
    await newResource.save();
    res.status(201).json({ message: 'Resource added successfully', resource: newResource });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add resource', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

router.get('/:domain', async (req, res) => {
  try {
    const resource = await Resource.findOne({ domain: req.params.domain });
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching resource' });
  }
});

router.put('/:domain', async (req, res) => {
  try {
    const updatedResource = await Resource.findOneAndUpdate(
      { domain: req.params.domain },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource updated', resource: updatedResource });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update resource', details: err.message });
  }
});

router.delete('/:domain', async (req, res) => {
  try {
    const deletedResource = await Resource.findOneAndDelete({ domain: req.params.domain });
    if (!deletedResource) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting resource' });
  }
});

module.exports = router;
