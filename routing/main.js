const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/authenticate');

//router.get('/', (req, res) => res.render('welcome'));

 router.get('/', (req, res) => {
   res.render('comingsoon');
   //console.log(req)
 });

//router.get('/', (req, res) => res.redirect('/users/login'));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.isbusiness == false) {
    res.render('dashboard', {user: req.user});
  } else {
    res.render('businessdashboard', {user: req.user});
  }

  //console.log(req);
});

router.get('/businessdashboard', (req, res) => {
  res.render('dashboard');
  //console.log(req);
});

router.get('/connect', ensureAuthenticated, (req, res) => {
  res.render('connections', {user: req.user});
  //console.log(req);
});

router.get('/store', ensureAuthenticated, (req, res) => {
  res.render('store', {user: req.user});
  //console.log(req);
});

module.exports = router;
//hello world
