/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use', 'Mustache'] , function(Bootstrap , Tab , Common, Mustache){
	
	Tab({
		"mainE" : $(".JS_tab_main"),
		"active_class" : "btn-info",
		"contentE" : $(".JS_tab_Content")
	});

	var init = function(){
		getData ();
	}

	var Doom = {
		"topic_report_count" : $("#topic_report_count"),
		"comment_report_count" : $("#comment_report_count"),
		"reason_count" : $("#reason_count"),
		"topicreportlistTemplate" : document.getElementById('topic_report_listTemplate'),
		"commentreportlistTemplate" : document.getElementById('comment_report_listTemplate'),
		"reasonlistTemplate" : document.getElementById('reason_listTemplate'),
		"detailTemplate" : document.getElementById('detail_template'),
		"btn_add_reason" : document.getElementById('add_report_reason'),
		"topic_report_list" : document.getElementById('topic_report_list'),
		"report_reason_list" : document.getElementById('report_reason_list'),
		"comment_report_list" : document.getElementById('comment_report_list'),
		"detail_list" : document.getElementById('detail_list'),
		"report_addModal"  : $("#report_add_modal"),
		"btn_report_add" : $("#btn_report_add"),
	}
	$('#add_report_reason').on('click',function(){
		Doom.report_addModal.modal("show");
	});
	Doom.btn_report_add.click(function(){
		var reason = $('#reasonaddInput').val();
		if (reason == ''){
			alert('请填写举报原因');
			return false;
		}
		Common.ajax({
			"url" : "/reason/add",
			"data": {'content':reason},
			success : function(data){
				if (data.c == 0){
					Doom.report_addModal.modal("hide");
					$('#reasonaddInput').val("");
					Common.ajax({
						"url" : "/reason/list",
						"data": {},
						success : function(data){
							console.log(data);
							showList(data.d.list, Doom.reasonlistTemplate, Doom.report_reason_list);
							Doom.reason_count.html(data.d.count);
						}
					});
				}
				else{
					alert('添加举报原因失败');
				}
			}
		});
	});
	
	Doom.report_addModal.on("show.bs.modal",function(){
		setTimeout(function(){
			Doom.addInput.focus();
		} , 600);		
	});

	/* 获取标签列表数据 */
	function getData (){
		Common.ajax({
			"url" : "/report/list",
			"data": {'type':'topic'},
			success : function(data){
				console.log(data);
				mustache(data.d, Doom.topicreportlistTemplate, Doom.topic_report_list);
				Doom.topic_report_count.html(data.d.count);
			}
		});
		Common.ajax({
			"url" : "/report/list",
			"data": {'type':'comment'},
			success : function(data){
				console.log(data);
				mustache(data.d, Doom.commentreportlistTemplate, Doom.comment_report_list);
				Doom.comment_report_count.html(data.d.count);
			}
		});
		Common.ajax({
			"url" : "/reason/list",
			"data": {},
			success : function(data){
				console.log(data);
				showList(data.d.list, Doom.reasonlistTemplate, Doom.report_reason_list);
				Doom.reason_count.html(data.d.count);
			}
		});
	}
	
	/* ===== mustache方式生成列表 =======*/
	function mustache(data, listTemplate, objList) {
		var template = listTemplate.innerHTML;
		var render = Mustache.render(template, data);
		objList.innerHTML = render;
	}
	/* =======生成列表 =========*/
	function showList ( arr , listTemplate, objList) {
		var str = "",
			tempStr = listTemplate.innerHTML;

		arr.forEach(function(obj){
			//obj.ctime = obj.ctime.toString().datechange();
			str += tempStr.temp(obj);
		});
		objList.innerHTML = str;
	}

	/*  删除举报原因 */
	$(Doom.report_reason_list).delegate(".JS_BTN_DELETEREASON" , "click" , function(){
		if(!confirm("确定要删除该举报原因?")){
			return false;
		}
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		Common.ajax({
			"url" : "/reason/delete/"+ids,
			"data": {},
			success : function(data){
				if (data.c == 0)
				{
					alert('删除举报原因成功');
					tr.remove();
					var str = Doom.reason_count.html();
					Doom.reason_count.html(--str);
				}
				else{
					alert('删除举报原因失败');
				}
			},
		});
	});
	/*  查看话题举报详情 */
	$(Doom.topic_report_list).delegate(".JS_BTN_DETAIL" , "click" , function(){
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		userid = tr.attr("data-userid");
		Common.ajax({
			"url" : "/report/detail",
			"data": {'userid':userid,'reportedid':ids, 'type':'topic'},
			success : function(data) {
				if (data.c == 0) {
					data.state = function(){if(this.status == 1){return "<button class='btn btn-default JS_BTN_HESHI'>核实</button>|<button class='btn btn-info JS_BTN_BUSHI'>不实</button>";} else if(this.status == 2) {return '核实';} else if (this.status == 3){return '不实';}};
					var template = Doom.detailTemplate.innerHTML;
					var render = Mustache.render(template, data);
					console.log(render);
					tr.after(render);
				}else{
					alert('获取举报详情时出错');
				}
			}
		})
	});
	$(Doom.comment_report_list).delegate(".JS_BTN_DETAIL" , "click" , function(){
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		userid = tr.attr("data-userid");
		Common.ajax({
			"url" : "/report/detail",
			"data": {'userid':userid,'reportedid':ids, 'type':'comment'},
			success : function(data) {
				if (data.c == 0) {
					data.state = function(){if(this.status == 1){return '<button class="btn btn-default JS_BTN_HESHI">核实</button>|<button class="btn btn-info JS_BTN_BUSHI">不实</button>';} else if(this.status == 2) {return '核实';} else if (this.status == 3){return '不实';}};
					var template = Doom.detailTemplate.innerHTML;
					var render = Mustache.render(template, data);
					console.log(render);
					alert(render);
					tr.after(render);
				}else{
					alert('获取举报详情时出错');
				}
			}
		})
	});
	$(Doom.topic_report_list).delegate(".JS_BTN_HESHI" , "click" , function(){
		alert('核实');
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		var btn = $(this);
		Common.ajax({
			"url" : "/report/handle",
			"data": {'reportedid':ids, 'type':'topic', 'result':2},
			success : function(data) {
				if (data.c == 0) {
					alert('处理成功');
					btn.parent().html('核实');
				}else{
					alert('处理失败');
				}
			}
		});
	});
	$(Doom.topic_report_list).delegate(".JS_BTN_BUSHI" , "click" , function(){
		alert('不实');
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		var btn = $(this);
		Common.ajax({
			"url" : "/report/handle",
			"data": {'reportedid':ids, 'type':'topic', 'result':3},
			success : function(data) {
				if (data.c == 0) {
					alert('处理成功');
					btn.parent().html('不实');
				}else{
					alert('处理失败');
				}
			}
		});
	});
	$(Doom.comment_report_list).delegate(".JS_BTN_HESHI" , "click" , function(){
		alert('核实');
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		var btn = $(this);
		Common.ajax({
			"url" : "/report/handle",
			"data": {'reportedid':ids, 'type':'comment', 'result':2},
			success : function(data) {
				if (data.c == 0) {
					alert('处理成功');
					btn.parent().html('核实');
				}else{
					alert('处理失败');
				}
			}
		});
	});
	$(Doom.comment_report_list).delegate(".JS_BTN_BUSHI" , "click" , function(){
		alert('不实');
		var tr = $(this).parents("tr"),
		ids = tr.attr("id");
		var btn = $(this);
		Common.ajax({
			"url" : "/report/handle",
			"data": {'reportedid':ids, 'type':'comment', 'result':3},
			success : function(data) {
				if (data.c == 0) {
					alert('处理成功');
					btn.parent().html('不实');
				}else{
					alert('处理失败');
				}
			}
		});
	});
	init();
});