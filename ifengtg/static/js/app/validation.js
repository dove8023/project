/*
	输入框验证函数集合
	time : 2015/9/16
	MD5 文件引用最好不要修改
*/

define(['MD5'] , function(Md5){

	/* 11位手机号码验证 */
	function phoneNumber (str){
		if(/^1\d{10}$/.test(str)){
			return true;
		}else{
			return false;
		}
	}

	/* 四位图片验证码 */
	function imgCode (str){
		if(/^[0-9a-zA-Z]{4}$/.test(str)){
			return true;
		}else{
			return false;
		}
	}

	/* 6位短信验证码 */
	function phoneCode (str){
		if(/^[0-9]{6}$/.test(str)){
			return true;
		}else{
			return false;
		}
	}

	/* 邮箱验证 */
	function isEmail (str) {
		if(/^[a-z0-9][a-z0-9_\-\.]*[a-z0-9]*\@[a-z0-9_\-]+(\.[a-z0-9]{2,}){1,}$/i.test(str)){
			return true;
		}else{
			return false;
		}
	}

	/* 6 ~ 20 位密码验证 only 数字、字母、下划线 */
	function checkPwd (str) {
		if (/^\S{6,20}$/.test(str)) {
			return true;
		}else{
			return false;
		}

		/*for (var i=0; i<str.length; i++) {
			if ((str.charCodeAt(i)>125) || (str.charCodeAt(i)<33)) {
				return false;
			}
		}
		return true;*/
	}


	/* 用户名验证 */
	function username (str){
		if(str.length > 50 || str.length == 0){
			return false;
		}

		if(!/^\w+$/.test(str)){
			return false;
		}


		return true;
	}

// alert(11);
	return {
		"phoneNumber" : phoneNumber,
		"imgCode"     : imgCode,
		"phoneCode"   : phoneCode,
		"isEmail"     : isEmail,
		"checkPwd"    : checkPwd,
		"username"    : username,
		"md5"         : Md5
	}

});
