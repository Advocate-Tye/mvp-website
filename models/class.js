const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  cname: String,

  ctext: String,
});

const Class = mongoose.model('class', ClassSchema);

module.exports = Class;
