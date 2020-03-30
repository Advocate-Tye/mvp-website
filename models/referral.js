const mongoose = require('mongoose');

const RefferalSchema = new mongoose.Schema({
  code: String
});

const Refferal = mongoose.model('Business', RefferalSchema);

module.exports = Refferal;
