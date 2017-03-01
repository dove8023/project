/* 首页相关路由处理 */
const superagent = require("superagent");
const fs = require("fs");


module.exports = (Router) =>{

	/* GET home page. */
	Router.get('/', function(req, res, next) {
		// if(req.session.key){
			/*res.render('index', { title: 'Express' , info : "hello ABC" });
			console.log("over");*/
		// }else{
		// 	res.redirect("/login");
		// }		

		superagent.get("http://localhost:3001/file").end(function(err , result){

			// console.log(result);
			console.log(result.header);
			console.log(result.files);
			// console.log(result.text);
			fs.createReadStream(result.files).pipe(res);
			/*if(err){
				console.log(err);
			}else{
				res.send(result.text);
			}*/
			
		});
	});
	return Router;
}
