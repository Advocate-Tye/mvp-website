const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
  username: String,

  instagram: String,

  email: String,

  password: String,



  business: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', AccSchema);

module.exports = User;
