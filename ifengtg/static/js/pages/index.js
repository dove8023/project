/*
	时尚后台首页 js 脚本
*/

require(['Bootstrap' , 'APP/common_use'] , function(Bootstrap , Common){
	$("#name").html(Common.ReadCookie("shizhuang_adminuname"));

});