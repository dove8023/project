/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/common_use' , 'DatePicker' , 'APP/paging'] , function(Bootstrap , Common , DatePicker , Paging){
	
	$(".JS_date").datepicker();
	
	/*Tab({
		"mainE" : $(".JS_tab_main"),
		"active_class" : "btn-info",
		"contentE" : $(".JS_tab_Content")
	});*/

	var Global = {
		"num" : 20, //每页显示条数
	}
	var GlobalSearch = {
		
	}
	var init = function(){
		getData ('/feedback/list', 0, function(data){
			showList(data.list, Doom.feedbacklistTemplate, Doom.feedback_list);
			Doom.feedback_count.html(data.count);
			$("#feedback_paging").html("");
			Paging( $("#feedback_paging") , Math.ceil(data.count/Global.num) , function(page){
				getData ( "/feedback/list" , page ,  function(data){
					showList(data.list, Doom.feedbacklistTemplate, Doom.feedback_list);
					Doom.feedback_count.html(data.count);
				});
			});
		});
	}

	var Doom = {
		"feedback_count" : $("#feedback_count"),
		"feedbacklistTemplate" : document.getElementById('feedback_listTemplate'),
		"feedback_list" : document.getElementById('feedback_list'),
		"input_startTime" : $("#start_time"),
		"input_endTime" : $("#end_time"),
	}

	function getData ( url , page , successfn ){
		Common.ajax({
			"url" : url,
			"data" : {				
				"startTime" : (GlobalSearch.hasOwnProperty('startTime') ?  GlobalSearch.startTime : ''),
				"endTime" : (GlobalSearch.hasOwnProperty('endTime') ?  GlobalSearch.endTime : ''),
				"page" : page,
				'limit' : Global.num,
			},
			success : function(data){
				if(successfn){
					successfn(data.d);
				}				
			}
		});
	}	

	/* =======生成列表 =========*/
	function showList ( arr , listTemplate, objList) {
		var str = "",
			tempStr = listTemplate.innerHTML;

		arr.forEach(function(obj){
			obj.ctime = obj.ctime.toString().datechange();
			str += tempStr.temp(obj);
		});
		objList.innerHTML = str;
	}

	/*  删除反馈 */
	$(Doom.feedback_list).delegate(".Js_Btn_DeleteFeedback" , "click" , function(){
		if(!confirm("确定要删除该反馈?")){
			return false;
		}
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		Common.ajax({
			"url" : "/feedback/delete/"+ids,
			"data": {},
			success : function(data){
				if (data.c == 0){
					alert('删除反馈成功');
					tr.remove();
					var str = Doom.feedback_count.html();
					Doom.feedback_count.html(--str);
				}
				else{
					alert('删除反馈失败');
				}
			},
		});
	});
	$("#btn_search").on('click', function(){
		GlobalSearch.startTime = Doom.input_startTime.val();
		GlobalSearch.endTime = Doom.input_endTime.val();
		getData('/feedback/list', 0, function(data){
			showList(data.list, Doom.feedbacklistTemplate, Doom.feedback_list);
			Doom.feedback_count.html(data.count);
			$("#feedback_paging").html("");
			Paging( $("#feedback_paging") , Math.ceil(data.count/Global.num) , function(page){
				getData ( "/feedback/list" , page ,  function(data){
					showList(data.list, Doom.feedbacklistTemplate, Doom.feedback_list);
					Doom.feedback_count.html(data.count);
				});
			});
		});
	});
	$("#btn_export").on('click', function(){
		var startTime = Doom.input_startTime.val();
		var endTime = Doom.input_endTime.val();
		window.location.href="/feedback/export?startTime=" + startTime + "&endTime=" + endTime;
	});
	init();
});