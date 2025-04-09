const express = require('express');
const Event = require('../contents/events.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, about, domain, participationLink, date, additionalInfo } = req.body;

  try {
    const newEvent = new Event({ name, about, domain, participationLink, date, additionalInfo });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const event = await Event.findById(req.params.name);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

router.put('/:name', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.name, req.body, { new: true, runValidators: true });
    if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated', event: updatedEvent });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update event', details: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.name);
    if (!deletedEvent) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
