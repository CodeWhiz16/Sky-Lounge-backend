const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');

// --- Multer setup for image uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// --- GET all events ---
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 }); // sorted by eventDate
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- GET event by ID ---
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- CREATE event ---
router.post('/', upload.single('imageFile'), async (req, res) => {
  try {
    const { artist, set, eventDate, dayDisplay, time, location, description, details } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });

    const newEvent = new Event({
      artist,
      set,
      eventDate,
      dayDisplay,
      time,
      location,
      description,
      details,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
});

// --- UPDATE event ---
router.put('/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.imageUrl = `/uploads/${req.file.filename}`;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
});

// --- DELETE event ---
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
});

module.exports = router;
