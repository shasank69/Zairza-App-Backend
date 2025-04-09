const express = require('express');
const Project = require('../contents/projects.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, domain, techStack, contributors, about, githubLink } = req.body;

  try {
    const newProject = new Project({ name, domain, techStack, contributors, about, githubLink });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add project', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const project = await Project.findOne({ name: req.params.name });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching project' });
  }
});

router.put('/:name', async (req, res) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project updated', project: updatedProject });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update project', details: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ name: req.params.name });
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

module.exports = router;
