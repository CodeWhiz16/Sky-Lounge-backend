



const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

/*
|--------------------------------------------------------------------------
| GET ALL EVENTS
|--------------------------------------------------------------------------
*/
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

/*
|--------------------------------------------------------------------------
| GET SINGLE EVENT BY ID
|--------------------------------------------------------------------------
*/
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

/*
|--------------------------------------------------------------------------
| CREATE EVENT (IMAGE URL ONLY)
|--------------------------------------------------------------------------
*/
router.post('/', async (req, res) => {
  try {
    const {
      artist,
      set,
      eventType,
      eventDate,
      dayDisplay,
      time,
      location,
      description,
      details,
      imageUrl
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const newEvent = new Event({
      artist,
      set,
      eventType,
      eventDate,
      dayDisplay,
      time,
      location,
      description,
      details,
      imageUrl
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE EVENT
|--------------------------------------------------------------------------
*/
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE EVENT
|--------------------------------------------------------------------------
*/
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

module.exports = router;
