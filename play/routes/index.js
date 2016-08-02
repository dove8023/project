var express = require('express');
var router = express.Router();
var arr = require("../models/mysql").tableArr;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' , data : arr });
});

router.get('/select/:mName' , function(req , res , next){
	var modelName = req.params.mName;

	var limits = req.query.limit / 1 || 30;

	req.models[modelName].find({} , limits , function(err , result){
		if(err){
			throw err;
			res.send("something worry");
		}else{
			res.render("select" , { title : "Select One Table" , mName : modelName , data : result , columns : Object.keys(result[0])});
		}
	});
	
});

module.exports = router;