const http = require("http");
const fs   = require("fs");
const path = require("path");
const url  = require("url");
const type = require("./types");



var form;

http.createServer(function(req , res){
	console.log(req.headers);
	var urlobj = url.parse(req.url , true);
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
					// console.log(item);
					html += '<li><a target="_blank" download href="/files/'+item+'">'+item+'</a></li>';
				});

				html += "</ul>" + form;
				res.write(html);
				res.end();
			}
		});
		
	}else if(pathname == "/favicon.ico"){
		res.end("yes");
	}else if(pathname.indexOf(".") !== -1){
		var realpath = path.join(__dirname, pathname);

		// res.writeHead(200 , {"Content-Type":})

		fs.readFile(realpath , function(err , data){
			if(err){
				console.log(err);
			}else{
				// console.log(data);
			}

			res.writeHead(200 , { "Content-Type": getType(pathname)+";charset=utf-8;" });
			res.write(data);
			res.end();
		});
		
	}else{
		res.writeHead(404);
		res.end("Not found");
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

function getType(url){
	var extname = path.extname(url).substr(1);
	return type[extname] || "text/plain";
}

fs.readFile("./views/form.html" , function(err , data){
	form = data.toString();
});