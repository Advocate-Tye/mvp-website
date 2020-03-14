const express = require('express');
const expressjs = require('express-ejs-layouts');
const mongo = require('mongodb');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const esession = require('express-session');

const app = express();

require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewURLParser: true })
  .then(() => console.log('Connected to atlas DB'))
  .catch(err => console.log(err));

app.use(expressjs);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));

app.use(esession({
  secret: 'abcdef',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.static(__dirname + '/local'));

app.use('/', require('./routing/main'));
app.use('/admin', require('./routing/admin'));
app.use('/users', require('./routing/users'));


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`App listening on port: ${port}`);
});
