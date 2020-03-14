const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  businessname: String,

  invite:  String,

  instagram: String,

  email: String,

  password: String,
});

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
