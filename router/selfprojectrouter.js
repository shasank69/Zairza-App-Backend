const express = require('express');
const SelfProject = require('../contents/selfproject.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, domain, techStack, contributors, about, githubLink } = req.body;

  try {
    const newProject = new SelfProject({ name, domain, techStack, contributors, about, githubLink });
    await newProject.save();
    res.status(201).json({ message: 'Self project added successfully', project: newProject });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add self project', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await SelfProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch self projects' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const project = await SelfProject.findOne({ name: req.params.name });
    if (!project) return res.status(404).json({ error: 'Self project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching self project' });
  }
});

router.put('/:name', async (req, res) => {
  try {
    const updatedProject = await SelfProject.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ error: 'Self project not found' });
    res.json({ message: 'Self project updated', project: updatedProject });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update self project', details: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const deletedProject = await SelfProject.findOneAndDelete({ name: req.params.name });
    if (!deletedProject) return res.status(404).json({ error: 'Self project not found' });
    res.json({ message: 'Self project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting self project' });
  }
});

module.exports = router;
