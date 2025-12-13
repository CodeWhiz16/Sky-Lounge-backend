const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    artist: { type: String, required: [true, 'Artist name is required.'], trim: true },
    set: { type: String, required: [true, 'Set or genre is required.'], trim: true },
    eventType: {
    type: String,
    required: false,
    trim: true
},
    eventDate: { type: Date, required: [true, 'Event date is required.'] },
    dayDisplay: { type: String, required: [true, 'Day display is required.'] },
    time: { type: String, required: [true, 'Time is required.'] },
    location: { type: String, required: [true, 'Location is required.'] },
    description: { type: String, required: [true, 'Short description is required.'] },
    details: { type: String, required: [true, 'Full event details are required.'] },
    imageUrl: { type: String, required: [true, 'Image URL is required.'] }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
