const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  date: Date,

  event: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
