const mongoose = require('mongoose');

const AccSchema = new mongoose.Schema({
  firstname: String,

  lastname: String,

  email: String,

  password: String,

  teacher: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', AccSchema);

module.exports = User;
