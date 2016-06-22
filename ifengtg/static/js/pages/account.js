/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use'] , function(Bootstrap , Tab , Common){
	
	Tab({
		"mainE" : $(".JS_tab_main"),
		"active_class" : "btn-info",
		"contentE" : $(".JS_tab_Content")
	});



	/* 给指定模态框添加事件 */
	$('#modalTest').on('shown.bs.modal', function () {
		
	}).on("hidden.bs.modal" , function(){
		
	})

	/*$("#one").modal({
		"remote" : "http://www.baidu.com"
	});*/

});