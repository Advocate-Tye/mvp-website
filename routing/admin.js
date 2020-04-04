const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const Referral = require('../models/referral');
const Product = require('../models/product');

const { ensureAdmin } = require('../config/admin');

router.get('/', ensureAdmin, (req, res) => {
  res.render('admin');
});

router.get('/ref', ensureAdmin, (req, res) => {
  res.render('referral');
});

router.get('/product', ensureAdmin, (req, res) => {
  res.render('createproduct');
});


router.post('/product', (req, res) => {
  const { name, price, folder, thumbnail } = req.body;

  const newProduct = new Product({
    name,
    price,
    folder,
    thumbnail
  });

  newProduct.save().then(pr => {
    req.flash('success_msg', 'Successfully created new product');
    res.redirect('/admin/product')
  })
});

router.post('/ref', (req, res) => {
  const { invite } = req.body;

  let errors = [];

  if (!invite) {
    erros.push({ msg: "Missing field"});
  }

  Referral.findOne({ invite: invite}).then(ref => {
    if (ref) {
      errors.push({ msg: "referral already exists" });
    }
    else {
      if (errors.length >= 1) {
        res.render('referral', {
          errors,
          invite
        });
      }
      const newRef = new Referral({
        invite
      });

      newRef.save().then(ref => {
        req.flash('success_msg', 'Successfully created business invite')
        res.redirect('/admin/ref');
      }).catch(err => {
        console.log(err);
      });
    }
  });
});

router.post('/', (req, res) => {
  const { invite, business} = req.body;
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
