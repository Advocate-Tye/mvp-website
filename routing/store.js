const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const Product = require('../models/product');
const Madras = require('../models/madras');
const User = require('../models/user');

const ObjectId = require('mongodb').ObjectID;

const { ensureAuthenticated } = require('../config/authenticate');

router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    console.log(products);
    res.render('store', {user: req.user, products: products});
  });
});

router.get('/product', (req, res) => {
  if (req.query.product) {
    console.log(req.query.product);
    Product.findOne({ _id: req.query.product }).then(product => {
      console.log(product);
      if (product) {
        res.render('product', {product: product});
      }
      else {
        res.redirect('/store');
      }
    });
  }
});

router.get('/madras', (req, res) => {
  if (req.query.code) {
    if (req.isAuthenticated()) {

      //var hex = /[0-9A-Fa-f]{6}/g;
      //var id = (hex.test(req.query.code)) ? ObjectId(id) : id;
      var id = req.query.code;


      if (mongoose.Types.ObjectId.isValid(id)) {
        console.log(id);
        Madras.findOne({_id: id}).then(madras => {
          if (madras) {
            if (madras.user == req.user.id) {
              res.render('madras', {madras: madras, user: req.user});
            } else {
              var error = '';
              for (var i = 0; i < madras.accepted.length; i++) {
                if (req.user.id == madras.accepted[i]) {
                  error = "a";
                  break;
                }
              }

              if (typeof req.user.location == 'undefined' || req.user.location =='' || req.user.location != madras.location) {
                error = "Sorry, but your location does not match the link creator's location.";
              }

              if (error == 'a') {
                res.render('madras', {madras: mad, user: req.user});
              } else if (error) {
                res.render('madras', {error: error, user: req.user});
              } else {
                madras.accepted.push(req.user.id);
                madras.uses = madras.uses + 1;
                madras.save().then(mad => {
                  var success = "You've successfully joined this group";
                  res.render('madras', {success: success, madras: mad, user: req.user});
                });
              }
            }
          } else {
            res.render('madras', {error: "This invite code is invalid test", user: req.user})
          }
        });
      } else {
        res.render('madras', {error: "This invite code is invalid", user: req.user});
      }
    } else {
      req.flash('error_msg', 'Please login to accept offer');
      res.redirect('/users/login');
    }
  }
  else {
    if (req.isAuthenticated()) {
      Madras.findOne({user: req.user.id}).then(madras => {
        if (madras) {
          res.render('madras', {madras: madras, user: req.user});
        }
        else {
          User.findOne({_id: req.user.id}).then(nuser => {
            if (typeof nuser.location != 'undefined' && nuser.location != "") {
              const user = req.user.id;
              const uses = 1;
              const location = nuser.location;
              const accepted = [req.user.id];

              const newM = new Madras({
                user,
                uses,
                location,
                accepted
              });

              console.log(newM);

              newM.save().then(mad => {
                res.render('madras', {madras: mad, user: req.user});
              });
            } else {
              res.redirect('/dashboard');
            }
          });
        }
      });
    } else {
      req.flash('error_msg', 'Please login to view this offer');
      res.redirect('/users/login');
    }
  }
});


module.exports = router;
