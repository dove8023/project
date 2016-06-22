/*
 *  author  : Mr. He
 *	time    : 2016/1/13
 *	content : 用户管理部分过滤数据处理
 */

define(['angular'] , function(angular){
	var app = angular.module("UserFilter" , []);
	
	/* 时间戳转换为标准时间 */
	app.filter("toTime" , function(){
		var toTimeFn = function(input){
			return input && input.toString().datechange();
		};
		return toTimeFn;
	});

	/* 没有头像时给默认头像 */
	app.filter("head_img" , function(){
		var deal_headImg = function(input){
			if(!input){
				return "http://y0.ifengimg.com/a/2015/1230/20dccc9812f33bdsize9_w200_h200.png";
			}else{
				return input;
			}
		}

		return deal_headImg;
	});

	/* 转换M , F为男女 */
	app.filter("sex" , function(){
		var sex_deal = function(input){
			if(input == "F"){
				return "女";
			}else if(input == "M"){
				return "男";
			}else{
				return "";
			}
		}

		return sex_deal;
	});

	/* 无数据时给出提示 */
	app.filter("nothing" , function(){
		var nothing = function(input){
			if(input == "" || !input){
				return "暂无";
			}else{
				return input;
			}
		}
		return nothing;
	});
	app.filter("is_editer_deal" , function(){
		var fn = function(input){
			if(input == "0"){
				return "普通";
			}else if(input == "1"){
				return "编辑";
			}else if(input == "2"){
				return "官方";
			}
		}
		return fn;
	});
	app.filter("cover_pic" , function(){
		return function (input){		
			try{
				input = JSON.parse(input);
				if(!input){
					return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
				}
			}catch(e){
				return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
			}
			return input[0].url;
		}
	});

	/* 操作类型判断 */
	app.filter("OperationType" , function(){
		var fn = function(input){
			switch(input){
				case "0":
					return "禁言,";
				case "1":
					return "黑名单,";
				case "2":
					return "头像恢复";
				case "3":
					return "昵称恢复";
			}
		}
		return fn;
	});
	/* 加入,解除 */
	app.filter("isAdd" , function(){
		var fn = function(input){
			if(!input){
				return "";
			}else if(input == "1"){
				return "加入";
			}else if(input == "0"){
				return "移除";
			}
		}
		return fn;
	});

	app.filter("nospeak_deal" , function(){
		var fn = function(input){
			if(input == 0){
				return "禁言,";
			}else{
				return "";
			}
		}
		return fn;
	});
	app.filter("status_deal" , function(){
		var fn = function(input){
			if(input == "0"){
				return "黑名单,";
			}else{
				return "";
			}
		}
		return fn;
	});

	/* 举报管理部分截取部分话题内容 */
	app.filter("ReportCutContent" , function(){
		var fn = function(input){
			/*input = input.replace(/\[\)\#\]\(/g , "图片");
			input = input.replace(/#br#/g , " ");*/
			return input.substr(0 , 30);
		}
		return fn;
	});
});