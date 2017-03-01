/* 首页相关路由处理 */

const fs = require("fs");
const path = require("path");


module.exports = (Router) =>{

	/* GET home page. */
	Router.get('/', function(req, res, next) {
		console.log(req.session.id);
		if(req.session.id){
			res.render('index', { title: 'Express' , info : req.session });
			console.log("over");
		}else{
			res.redirect("/login");
		}
		
	});



	Router.get("/file" , (req , res , next) => {

		let filepath = path.join(__dirname , "../download/views.zip");

		let stats = fs.statSync(filepath);

		res.set({
			// 'Content-Type': 'application/octet-stream',
			'Content-Type' : "text/plain",
			'Content-Disposition': 'attachment; filename='+"views.zip",
			'Content-Length': stats.size
		});

		fs.createReadStream(filepath).pipe(res);

		/*res.sendFile("views.zip" , {
			"root" : path.join(__dirname , "../download/"),

		} , function(err){
			if(err){
				console.log(err);
				res.status(err.status).end();
			}else{
				console.log("sent : ")
			}
		})*/
		
	});


	Router.get("/go" , (req , res , next)=>{
		console.log("go")
		next();
	});



	return Router;
}
