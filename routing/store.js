const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/authenticate');

router.get('/', (req, res) => {
  res.render('store', {user: req.user});
});

router.get('/product', (req, res) => {
  res.render('product');
});

module.exports = router;
