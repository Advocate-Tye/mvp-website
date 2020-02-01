const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

router.get('/login', (req, res) => res.render("login"));

router.get('/register', (req, res) => res.render("register"));

//Registration request handling
router.post('/register', (req, res) => {
  //console.log("new account registered: %j", req.body);
  const { firstname, lastname, email, password, password2, teacher } = req.body;
  let errors = [];

  //console.log(firstname);

  if (!firstname || !lastname || !email || !password || !password2 || !teacher) {
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
      firstname,
      lastname,
      email,
      password,
      password2,
      teacher
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if(user) {
        errors.push({ msg: "Email is already registered" });
        res.render('register', {
          errors,
          firstname,
          lastname,
          email,
          password,
          password2,
          teacher
        });
      } else {
        //console.log(firstname);

        const newAccount = new User({
          firstname,
          lastname,
          email,
          password,
          teacher
        });

        console.log("new account registered: %j", newAccount);

        //bcryptjs password hashing

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAccount.password, salt, (err, hash) => {
            if(err) { throw err; }

            newAccount.password = hash;

            newAccount.save().then(user => {
              req.flash('success_msg', 'Successfully registered! Please login to continue.')
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully signed out');
  res.redirect('/');
});

module.exports = router;
