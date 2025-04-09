const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const upload = require('../cloudinary/multer.js');
const User = require('../contents/auth.js');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', upload.single('profilePic'), async (req, res) => {
  const { name, registrationNumber, email, password, batch, technicalSkills, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      registrationNumber,
      email,
      password: hashedPassword,
      batch,
      technicalSkills,
      role,
      profilePic: req.file ? req.file.path : ''
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.get('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.delete('/:email', async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ email: req.params.email });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.put('/:email', async (req, res) => {
  const updates = req.body;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      updates,
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
