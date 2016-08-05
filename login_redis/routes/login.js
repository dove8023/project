/* 登录相关路由处理 */

module.exports = (Router , Redis) => {

	Router.get('/login', function(req, res, next) {

		res.render("login" , { "title" : "登录页面" });
	});

	Router.get("/loginout" , function(req , res , next){

		req.session.destroy(function(err){
			if(err){ 
				console.log(err);
			}else{
				console.log("/loginout , clear" , req.session);
				res.redirect("/");
			}
		})
		
	});

	Router.post("/login" , function(req , res , next){
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

				req.session.key = result[0];   //保存用户数据至session中，保存到redis里
				res.redirect("/");
			});
		}else{
			res.redirect("/login");
		}
	});

	return Router;
};
