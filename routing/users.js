const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/authenticate');

const User = require('../models/user');
const Referral = require('../models/referral');

router.get('/login', (req, res) => res.render("login"));

router.get('/betatest', (req, res) => res.render("betatest"));

router.get('/register', (req, res) => res.render("register"));

router.get('/business', (req, res) => res.render("business"));

router.get('/ref', ensureAuthenticated, (req, res) => {
  res.render('acceptreferral', {user: req.user});
  //console.log(req);
});

router.get('/businessinfo', (req, res) => res.render(""))

router.post('/ref', (req, res) => {
  const { invite } = req.body;

  console.log(invite);

  let errors = [];
  if (invite == '') {
    errors.push({ msg: 'Required field is empty' });
  }

  if (errors.length >= 1) {
    res.render('acceptreferral', {
      errors,
      invite
    });
  }


  Referral.findOne({ invite: invite }).then(ref => {
    if (ref) {
      console.log(ref);
      User.findOne({ email: req.email }).then(user => {
        if (user) {
          if (user.referral != '' || user.referral != null) {
            errors.push({ msg: 'You have already claimed a referral' });

            res.render('acceptreferral', {
              errors,
              invite
            });
          }

          ref.uses += 1;
          user.referral = invite;

          ref.save();

          user.save().then(user => {
            req.flash('success_msg', 'Successfully claimed referral!')
            res.redirect('/users/ref');
          }).catch(err => {
            console.log(err);
          });

        }
        else {
          res.render('landing');
        }
      });
    } else {
      errors.push({ msg: 'Referral code is invalid' });

      res.render('acceptreferral', {
        errors,
        invite
      });
    }
  });
});

//Registration request handling
router.post('/register', (req, res) => {
  //console.log("new account registered: %j", req.body);
  const { email, password, password2 } = req.body;
  const points = 0;
  let errors = [];

  //console.log(firstname);

  if (!email || !password || !password2) {
    errors.push({ msg: 'Required field is empty' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password is too short. Minimum of 6 characters' });
  }

  if (errors.length >= 1) {
    res.render('register', {
      errors,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email is taken" });
        res.render('register', {
          errors,
          email,
          password,
          password2,
        });
      } else {
        //console.log(firstname);

        const newAccount = new User({
          email,
          password,
          points
        });

        console.log("new account registered: %j", newAccount);

        //bcryptjs password hashing

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAccount.password, salt, (err, hash) => {
            if(err) { throw err; }

            newAccount.password = hash;

            newAccount.save().then(user => {
              req.flash('success_msg', 'Successfully registered! Please login to start earning!')
              res.redirect('/users/login');
            }).catch(err => {
              console.log(err);
            });
          });
        });

      }
    });
  }
});

router.post('/business', (req, res) => {
  const { email, invite, password, password2 } = req.body;
  let errors = [];


  if (!email || !invite || !password || !password2) {
    errors.push({ msg: 'Required field is empty' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password is too short. Minimum of 6 characters' });
  }

  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.push({ msg: "Email is already taken" })
    }
  });

  if (errors.length >= 1) {
    res.render('business', {
      errors,
      email,
      invite,
      password,
      password2,
    });
  } else {
    User.findOne({ invite: invite }).then(user => {
      if (user) {
        if (user.invite == "") {
          errors.push({ msg: "Invite code is invalid" });
          res.render('business', {
            errors,
            email,
            invite,
            password,
            password2,
          });
        }
        user.email = email;
        user.password = password;
        user.invite = "";

        //bcryptjs password hashing

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) { throw err; }

            user.password = hash;

            user.save().then(user => {
              req.flash('success_msg', 'Successfully registered! Please login to start earning!')
              res.redirect('/users/login');
            }).catch(err => {
              console.log(err);
            });
          });
        });
      } else {
        errors.push({ msg: "Invite code is invalid" });
        res.render('business', {
          errors,
          email,
          invite,
          password,
          password2,
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully signed out.');
  res.redirect('/');
});

module.exports = router;
