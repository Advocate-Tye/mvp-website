const mongoose = require('mongoose');

const MadrasSchema = new mongoose.Schema({
  user: String,
  uses: Number,
  location: String,
  accepted: [String]
});

const Madras = mongoose.model('Madras', MadrasSchema);

module.exports = Madras;
