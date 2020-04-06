const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/authenticate');
const User = require('../models/user');

//router.get('/', (req, res) => res.render('welcome'));

 router.get('/', (req, res) => {
   if (req.isAuthenticated()) {
     res.redirect('/dashboard');
   }
   else {
     res.render('landing');
   }
   //console.log(req)
 });

 router.get('/home', (req, res) => {
   res.render('landing');
   //console.log(req)
 });

 router.post('/', (req, res, next) => {
   const { email } = req.body;
   res.redirect('/users/register/?valid=' + encodeURIComponent(email));
 });


//router.get('/', (req, res) => res.redirect('/users/login'));

router.get('/dashboard', ensureAuthenticated, (req, res) => {

  if (req.user.isbusiness == false) {
    User.countDocuments({}, function (err, count) {
      res.render('dashboard', {user: req.user, count})
    });

  } else {
    res.render('businessdashboard', {user: req.user});
  }

  //console.log(req);
});

//router.get('/businessdashboard', (req, res) => {
//  res.render('dashboard');
  //console.log(req);
//});

router.get('/learnmore', (req, res) => {
  res.render('businessinfo');
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
