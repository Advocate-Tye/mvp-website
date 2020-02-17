const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
  username: String,

  email: String,

  password: String,

  points: Number,

  socials: {
    instagram: String,
    twitter: String,
    facebook: String
  },

  business: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', AccSchema);

module.exports = User;
