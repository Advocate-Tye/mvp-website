const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Product = require('../models/product');

const { ensureAuthenticated } = require('../config/authenticate');

router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    console.log(products);
    res.render('store', {user: req.user, products: products});
  });
});

router.get('/product', (req, res) => {
  res.render('product');
});

module.exports = router;
