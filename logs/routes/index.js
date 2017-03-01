/* 首页相关路由处理 */

module.exports = (Router) =>{

	/* GET home page. */
	Router.get('/', function(req, res, next) {
		if(req.session.key){
			res.render('index', { title: 'Express To log' , info : req.session.key });
		}else{
			res.redirect("/login");
		}		
	});
	return Router;
}
