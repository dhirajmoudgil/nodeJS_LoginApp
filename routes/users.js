var express = require('express');
var router = express.Router();

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
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});


module.exports = router;