/*
	时尚后台话题管理js 脚本
*/

require(['jQuery' , 'Particles'] , function( jQuery , Particles ){

	/* 背景效果 */
	particlesJS.load('particles-js', '/static/js/libs/particles.json', function() {
		// console.log('callback - particles.js config loaded');
	});
	
	var Doom = {
		"loginForm" : $("#login_from"), //登录表单
		"btnCommit" : $("#btn_commit"), //提交按钮
		"username" : $("#name"),
		"password" : $("#password"),
	};

	if(localStorage.getItem("username")){
		Doom.username.val(localStorage.getItem("username"));
	}
	
	Doom.btnCommit.click(function(event) {
		event.preventDefault();
		var username = Doom.username.val();
		var password = Doom.password.val();
		if(!username){
			alert("请输入用户名");
			return false;
		}
		if(!password){
			alert("请输入密码");
			return false;
		}
		localStorage.setItem("username" , username);

		var sendData = {"name":username,"pass":password};

		if(imgCheck){
			//需要验证码
			sendData.code = ImgCheckCodeE.next().val();
			if(!sendData.code){
				alert("请输入验证码");
				return false;
			}
		}
		
		$.ajax({
			"url" : "/login/login",
			"dataType" : "json",
			"type" : "post",
			"data" : sendData,
			success : function(data){
				if (data.c == 0 && data.m == 0)
				{
					window.location.href = '/';
				}
				else if(data.c == 0 && data.m == 2){
					imgCheckBoxE.show();
					imgCheck = true;
					alert("帐号密码错误，或验证码错误");
					ImgCheckCodeE.click();
				}
				else
				{
					alert("帐号密码错误");
				}
			},
			error  : function(){
				alert("数据发送错误");
			}
		});
	});



	/* 验证码点击 */
	var ImgCheckCodeE = $("#ImgCheckCode"),   //验证码图片
		imgCheckBoxE  = $("#imgCheckBox"),    //验证码父级
		imgCheck      = false;                //默认不需要验证码
	ImgCheckCodeE.on("click" , function(){
		this.src = "https://id.ifeng.com/public/authcode?_="+ (+new Date());
	});
});