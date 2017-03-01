/* 登录相关路由处理 */

module.exports = (Router , Redis) => {

	Router.get('/login', function(req, res, next) {
		res.render("login" , { "title" : "登录页面" });
	});

	Router.get("/loginout" , function(req , res , next){
		req.session = null;
		console.log("/loginout , clear" , req.session);
		res.redirect("/");
	});

	Router.post("/login" , function(req , res , next){
		console.log(123,req.body);
		if(req.body.name && req.body.age){
			req.models.tests.find({
				"sex":req.body.name,
				"age" : req.body.age
			} , function(err , result){
				if(err) throw err;

				if(!result.length){
					res.render("login" , {"title" : "没这个人"});
					return;
				}

				req.session = result[0];

  				req.sessionOptions.maxAge = 200000;  //设置session的过期时间

  				/*console.log(req);
  				console.log(req.cookies);*/
				res.redirect("/");
			});
		}else{
			res.redirect("/login");
		}
	});

	return Router;
};
