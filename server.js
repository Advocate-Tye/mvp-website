const express = require('express');
const expressjs = require('express-ejs-layouts');
const mongo = require('mongodb');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const esession = require('express-session');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const User = require('./models/user');

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
// app.listen(port, function() {
//   console.log(`App listening on port: ${port}`);
// });
server.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

io.on('connection', (socket) => {
  var ad = socket.handshake.address;
  console.log(ad.address + ':' +  ad.port);

  socket.on('login', (email) => {
    var ip = socket.request.connection.remoteAddress;

    User.findOne({ email: email }).then(user => {
      if (user) {
        var found = false;
        for (var i = 0; i < user.ip.length; i++) {
          if (user.ip[i] == ip) {
            found = true;
            break;
          }
        }
        if (!found) {
          user.ip.push(ip);
          console.log(user + " logged in from new ip " + ip);
          user.save();
        }
      }
    });
  });
});
