const http = require("http");
const fs   = require("fs");
const path = require("path");
const url  = require("url");

http.createServer(function(req , res){

	var urlobj = url.parse(req.url);
	console.log(urlobj);
	var pathname = urlobj.pathname;


	if(pathname == "/"){
		res.writeHead(200 , { "Content-Type":"text/html;charset=utf-8;" });
		readdir(function(err , data){
			if(err){
				console.log(err);
				res.end("err");
			}else{
				var html = "<ul>";
				data.forEach(function(item, index){
					console.log(item);
					html += '<li><a href="/files/'+item+'">'+item+'</a></li>';
				});
				res.write(html);
				res.end();
			}
		});
		
	}else if(pathname == "/read"){
		res.end("read");
	}


	/*fs.readdir("./" , function(err, data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			res.end("hello");
		}
	});*/
}).listen(3000 , function(){
	console.log("static server running.")
});




function readdir(callback){
	fs.readdir("./files" , function(err, data){
		if(err){
			return callback && callback(err);
		}

		return callback && callback(null , data);
	});
}
