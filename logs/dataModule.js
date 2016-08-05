const orm = require("orm");
const mysqlConfig = require("./db/mysql.json");


function connect(app){
	app.use(orm.express(mysqlConfig , {
		define : function(db , models , next){
			console.log("connect mysql.");
			models.tests = db.define("tests" , {
				"id" : Number,
				"name":String,
				"sex":String,
				"age":Number,
				"createTime":Date
			});

			next();
		}
	}));
}




module.exports = connect;