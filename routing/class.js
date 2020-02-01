const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Class = require('../models/class');

router.get('/joinclass', (req, res) => res.render("joinclass"));

router.get('/createclass', (req, res) => res.render("createclass"));

//Registration request handling
router.post('/createclass', (req, res) => {
  //console.log("new account registered: %j", req.body);
  const { cname, ctext } = req.body;
  let errors = [];

  //console.log(firstname);

  if (!cname) {
    errors.push({ msg: 'Required field is empty' });
  }
  if (!ctext) {
    errors.push({ msg: 'Required field is empty' });
  }
    Class.findOne({ cname: cname }).then(aclass => {
      if(aclass) {
        errors.push({ msg: "Class name is already registered" });
        res.render('createclass', {
          errors,
          cname,
          ctext
        });
      } else {
        //console.log(firstname);
        const newClass = new Class({
          cname,
          ctext
        });
        classtext = ctext;
        console.log("new class registered: %j", newClass);

            newClass.save().then(aclass => {
              req.flash('success_msg', 'Successfully created! Please join class to continue.')
              res.redirect('/dashboard');
            }).catch(err => {
              console.log(err);
            });
      }
    });
});

router.post('/joinclass', (req, res) => {

  const { cname, ctext } = req.body;
  let errors = [];



  if (!cname) {
    errors.push({ msg: 'Required field is empty' });
  }
    Class.findOne({ cname: cname }).then(aclass => {
      if(!aclass) {
        errors.push({ msg: "Class does not exist" });
        res.render('joinclass', {
          errors,
          cname,
          ctext
        });
      } else {
        classname = cname;
        res.redirect('/classpg');
        };
      });
});

router.post('/classpg', (req, res) => {
  const {ctext } = req.body;
  let errors = [];
  Class.findOne({ cname: classname }).then(aclass =>{
      db.classes.remove(aclass)
  });
  cname = classname;
  const newClass = new Class({
    cname,
    ctext
  });
  classtext = ctext;
  res.redirect('/classpg');
});

module.exports = router;
