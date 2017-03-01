var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req.models.channel);

    req.models.channel.find({} , 150 , function(err , result){
        console.log(result)
        res.render('index', { title: 'Express' , data : result });
    });
});






module.exports = router;