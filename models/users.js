var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//User Schema
var UserSchema = mongoose.Schema({
	username:{
		type: String,
		index:true
	},
	password:{
		type: String
	},
	email:{
		type: String
	},
	name:{
		type: String
	}
});

var User = module.exports = mongoose.model('users', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
		    newUser.password = hash;
		    newUser.save(callback);
		});
	});
}

module.exports.getUserByUsername = function(username, callback){
	User.findOne({username: username}, callback);
}

module.exports.comparePassword = function(candidatePasssword, hash, callback){
	bcrypt.compare(candidatePasssword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback){
	User.findOne({_id: id}, callback);
}