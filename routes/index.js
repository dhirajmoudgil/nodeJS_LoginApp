var express = require('express');
var router = express.Router();

console.log("Index Started!!")
//get homepage
router.get('/', function(req, res){
	res.render('index');
});

module.exports = router;