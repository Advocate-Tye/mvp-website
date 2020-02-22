const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
  username: String,

  email: String,

  password: String,

  points: Number,

  socials: {
    instagram: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    facebook: {
      type: String,
      default: ""
    }
  },

  business: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', AccSchema);

module.exports = User;
