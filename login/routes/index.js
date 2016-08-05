/* 首页相关路由处理 */

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
	return Router;
}
