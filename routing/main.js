const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/authenticate');

router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {user: req.user});
  console.log(req);
});

router.get('/calendar', ensureAuthenticated, (req, res) => {
  res.render('calendar', {user: req.user});
  console.log(req);
});

router.get('/createclass', ensureAuthenticated, (req, res) => {
  res.render('createclass', {user: req.user});
  console.log(req);
});

router.get('/joinclass', ensureAuthenticated, (req, res) => {
  res.render('joinclass', {user: req.user});
  console.log(req);
});

router.get('/classpg', ensureAuthenticated, (req, res) => {
  res.render('classpg', {user: req.user, aclass: req.aclass});
  console.log(req);
});

module.exports = router;
