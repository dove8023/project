const config  = require("../db/mydb.json");
var orm = require("orm");
	/*config = require('../db/config.json'), //tell which name use.
    db = require('../db/mysql.json'),     //connect config.
    mysql = db[config.db];*/

   // console.log(mysql);

/*orm.connect(config , function (err, db) {
	if (err) throw err;

    var Tests = db.define("tests" , {
    	"name" : String,
    	"sex"  : String,
    	"age"  : Number,
    	"createTime" : Date
    });

    // Tests.create({
    // 	"name" : "hello",
    // 	"sex"  : "man",
    // 	"age"  : 23,
    // 	"createTime" : new Date().toLocaleString()
    // } , function(err){
    // 	if(err) throw err;

    // 	console.log("add success");
    // });

    console.log(+new Date());
    
    // CreateOne(Tests , 10000);

});*/


function connect(app){
	app.use(orm.express(mysql , {
		define : function(db , models , next){
			models.Tests = db.define("tests" , {
				"name" : String,
		    	"sex"  : String,
		    	"age"  : Number,
		    	"createTime" : Date
			});

			next();
		}
	}))
}


module.exports = connect;


function CreateOne(obj , max){
	for(let i=1;i<=max;i++){
		obj.create({
			"name" : Math.random().toString(32).substr(2),
			"sex"  : i%3 == 0 ? "woman" : "man",
			"age"  : i,
			"createTime" : new Date().toLocaleString()
		} , function(err){
			if(err) throw err;

			if(i>= max){
				console.log(+new Date());
			}
		})
	}
}