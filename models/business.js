const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  username: String,

  businessname: String,

  instagram: String,

  email: String,

  password: String,
});

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
