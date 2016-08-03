/*
 * write all the mysql data into the redis.
*/
const http  = require("http");
const url   = require("url");
const redis = require("redis");
const orm   = require("orm");
const dbconfig=require("./db/mysql.json");
const redisconfig = require("./db/redis.json");

var client = redis.createClient(redisconfig);

client.on("connect" , function(err){
	console.log("connect redis");
});

var Tests;

orm.connect(dbconfig , function(err , db){
	if(err) throw err;

	console.log("connect mysql");
	//创建数据模型
	Tests = db.define("tests" , {
		"name" : String,
    	"sex"  : String,
    	"age"  : Number,
    	"createTime" : Date
	});
	//获取所有数据
	Tests.find({} , function(err , result){
		if(err) throw err;

		//将所有数据写入redis中
		console.log(+new Date());
		for(let i=0,len=result.length;i<len;i++){
			var data = result[i];
			// console.log(data);
			if(!data) continue;
			client.hmset("user:"+data.id , {
				"username" : data.name,
				"age"      : data.age,
				"sex"      : data.sex,
				"createTime":data.createTime
			} , function(err , result){
				if(err) throw err;
				if(i>=len-1){
					console.log("over result");
					console.log(+new Date());
				}
			});
		}
	});
});

http.createServer(function(req , res , next){
	var Urls = url.parse(req.url , true);

	var arg = Urls.query;

	if(Urls.pathname == "/"){
		if(arg.id){
			//查询
			client.hgetall("user:"+arg.id , function(err , data){
				if(err) throw err;
				// console.log(data);

				var data = data[0] || data;

				if(!data){
					res.end("not this message");
					return;
				}

				res.writeHead(200 , {"Content-Type":"text/plain"});
				res.write("name :"+data.username+"\n" + "age : " + data.age);
				res.end();
			})
			
		}else{
			res.end("hello");
		}
		
	}else{
		res.writeHead(404);
		res.end();
	}
}).listen(3000 , function(){
	console.log("server running");
})

