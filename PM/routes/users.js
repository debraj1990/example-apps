var express = require('express');
var router = express.Router();
var User = require('../model/User')
const passport = require('passport');
const bcrypt = require('bcryptjs')

router.get('/register', function (req, res, next) {
  res.render('users/register-form');
});

router.get('/login', function (req, res, next) {
  res.render('users/login-form');
});


router.post('/login', function (req, res, next) {

  let form = req.body;

  let errors = [];
  if (form.userName === "") {
    errors.push({ message: 'UserName is required' })
  }
  if (form.password === "") {
    errors.push({ message: 'password is required' })
  }
  if (errors.length > 0) {
    res.render('users/login-form', { errors, userName: form.userName, password: form.password, })
  } else {

    passport.authenticate('local', {
      successRedirect: '/products',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);

  }

});




router.get('/logout', function (req, res) {
  req.logout();
  res.redirect("/")
})

router.post('/register', function (req, res, next) {
  let form = req.body;


  // validate
  let errors = [];
  if (form.userName === "") {
    errors.push({ message: 'UserName is required' })
  }
  if (form.password === "") {
    errors.push({ message: 'password is required' })
  }
  if (form.email === "") {
    errors.push({ message: 'Email is required' })
  }
  if (errors.length > 0) {
    res.render('users/register-form', { errors, userName: form.userName, password: form.password, email: form.email })
  }
  else {
    const saltRounds = 10;
    const myPlainTextPassword = form.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlainTextPassword, salt, function (err, hash) {
        var newUser = new User(form); // mongoose model
        newUser.password = hash;

        newUser.save()
          .then(() => {
            req.flash('success_msg', 'you have registred');
            res.redirect('/users/login')
          })
      });
    });

  }

});



module.exports = router;