var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');
//register
router.get('/register', function(req, res){
	res.render('register');
});

//login
router.get('/login', function(req, res){
	res.render('login');
});

//register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validation
	var error = false;
	if(name == ""){
		errors = true;
	}else if(email == ""){
		error = true;
	}else if(username == ""){
		errors = true;
	}else if(password == ""){
		errors = true;
	}else if(password2 != password){
		errors = true;
	}else{
		errors = false;
	}

	if(errors){
		console.log("Fill All the fields Correctly!")
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err){
				throw err;
				console.log(err);
			} else{
				console.log(user);
				req.flash('success_msg', 'You are registered and can now login');

				res.redirect('/users/login');
			}
			
		});

		
	}
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message:'Unknown User'});
			}

			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message:'Invalid Password'});
				}
			});
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res) {
  	res.redirect('/');
  });


router.get('/logout', function(req, res) {
  	req.logout();
  	req.flash('success_msg', 'You are logged out successfully!');

  	res.redirect('/users/login');
});


module.exports = router;