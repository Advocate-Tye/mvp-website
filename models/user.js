const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
  invite: String,

  name: String,

  email: String,

  password: String,

  points: Number,

  business: String,

  referral: String,

  location: String,

  offercode: String,

  ip: [String],

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

  isbusiness: {
    type: Boolean,
    default: false,
  },

  admin: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', AccSchema);

module.exports = User;
