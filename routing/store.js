const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/authenticate');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('store', {user: req.user})
});

module.exports = router;
