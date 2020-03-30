const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const Referral = require('../models/referral');

const { ensureAdmin } = require('../config/admin');

router.get('/', ensureAdmin, (req, res) => {
  res.render('admin');
});

router.get('/ref', ensureAdmin, (req, res) => {
  res.render(referral);
});

router.post('/ref', (req, res) => {
  const code = req.body;

  let errors = [];

  if (!code) {
    erros.push({ msg: "Missing field"});
  }

  Referral.findOne({ code: code}).then(ref => {
    if (ref) {
      errors.push({ msg: "referral already exists" });
    }
    else {
      const newRef = new Referral({
        code
      });

      newRef.save().then(user => {
        req.flash('success_msg', 'Successfully created business invite')
        res.redirect('/admin');
      }).catch(err => {
        console.log(err);
      });
    }
  });
});

router.post('/', (req, res) => {
  const { invite, business } = req.body;
  let errors = [];


  if (!invite || !business) {
    errors.push({ msg: 'Missing field' });
  }

  if (errors.length >= 1) {
    res.render('register', {
      errors,
      invite,
      business
    });
  } else {
    User.findOne({ invite: invite }).then(user => {
      if (user) {
        errors.push({ msg: "invite taken" });
        res.render('register', {
          errors,
          invite,
          business,
        });
      } else {
        User.findOne({ business: business}).then(user => {
          const newAccount = new User({
            invite,
            business
          });

          newAccount.isbusiness = true;

          newAccount.save().then(user => {
            req.flash('success_msg', 'Successfully created business invite')
            res.redirect('/admin');
          }).catch(err => {
            console.log(err);
          });
        });
      }
    });
  }
});

module.exports = router;
