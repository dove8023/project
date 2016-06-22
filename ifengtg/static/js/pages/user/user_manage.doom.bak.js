/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/common_use' , 'DatePicker' , 'APP/tab_change' , 'APP/paging' , 'Mustache'] , function(Bootstrap , Common , DatePicker , Tab , Paging , Mustache){

	/*console.log(Mustache);

	var view = {
		"title" : "YZF",
		"gg"    : "<b>say me.</b>",
		"body"  : {
			"first" : "one",
			"second": "two",
			"three" : 3
		},
		say     : function(){
			return 10 + 12;
		},
		"ok"  : false,
		"arr" : [1,2,3,4,5,6,7,8]
	}


	$("#test").html(Mustache.render("{{title}} spends {{say}} , come body You think. {{&gg}} . Tell me a new story {{body.three}}.  Somebody come here. {{#ok}} Good job. {{/ok}} <br /> {{#arr}} {{.}} <br /> {{/arr}} " , view));*/

	$(".JS_date").datepicker();

	Tab({
		"mainE" : $(".JS_tab_main"),
		"active_class" : "active",
		"contentE" : $(".JS_tab_Content"),
		main_callback : function(obj){
			// alert(obj.attr("data-number"));
		}
	});

	var Doom = {
		"userList" : $("#userList"), //用户列表盒子
		"userList_template" : $("#userList_template"),     //普通用户模板
		"darknameList" : $("#darknameList"),  //黑名单用户列表盒子
		"darknameList_template" : $("#darknameList_template"),
		"shutupList" : $("#shutupList"),
		"shutupList_template" : $("#shutupList_template"),

		"USERPAGE"   : $("#USERPAGE"),       //页面大盒子
		"userInfoModal" : $("#UserInfo_modal"),   //用户详情模态框
		"searchBtn"   : $("#searchBtn"),
		"user_info"   : document.getElementById("user_info"),     //用户详情展示div
		"user_info_template" : document.getElementById("user_info_template"),  //用户详情模板
	}

	var Global = {
		"num" : 15, //每页显示条数
		"currentType" :  0,  //0,普通用户; 1,黑名单用户; 2,禁言用户
	}


	/* 搜索功能 */
	Doom.searchBtn.click(function(event){
		event.preventDefault();
		alert("暂未添加");
	});

	/* 获取数据方法 */
	function getData ( url , data , successfn , search ){
		if(search){
			data = $.extend( data , search );
		}
		Common.ajax({
			"url" : window.IP + url,
			"data" : data,
			success : function(data){
				// console.log(data);
				successfn(data.d);
			}
		});
	}

	/* 展示普通用户列表数据 */
	function showData ( arr , tempE ,targetE ){
		var str = "",
			tempStr = tempE.innerHTML;
		if(arr.length == 0){
			targetE.innerHTML = "<h1>暂时没有数据</h1>";
			return false;
		}
		arr.forEach(function(obj){
			if(!obj.head){
				obj.head = "/static/images/aa.jpg";
			}
			obj.ctime = obj.ctime.toString().datechange();
			if(obj.ltime){
				obj.ltime = obj.ltime.toString().datechange();
			}
			if(obj.otime){
				obj.otime = obj.otime.toString().datechange();
			}			
			if(obj.sex){
				obj.sex == "M" ? obj.sex="男" : obj.sex="女"
			}

			/* 判断状态 */
			if(obj.status == 0){
				//黑名单
				obj.userType = obj.userType ? obj.userType + "黑名单," : "黑名单,";
				obj.detail_nospeak = "";
			}
			if(obj.nospeak == 0){
				//禁言用户
				obj.userType = obj.userType ? obj.userType + "禁言," : "禁言,";
			}
			if(obj.is_editer == 0){
				obj.userType = obj.userType ? obj.userType + "普通" : "普通";
			}else if(obj.is_editer == 1){
				obj.userType = obj.userType ? obj.userType + "编辑" : "编辑";
			}else if(obj.is_editer == 2){
				obj.userType = obj.userType ? obj.userType + "官方用户" : "官方用户";
			}
			str += tempStr.temp(obj);
		});
		targetE.innerHTML = str;
	}

	/*var dealData = {
		toDateTime : function(str){			
			if(this.ctime){
				this.ctime = this.ctime.toString().datechange();
			}
			if(this.ltime){
				this.ltime = this.ltime.toString().datechange();
			}
			if(this.otime){
				this.otime = this.otime.toString().datechange();
			}		
		},
		toSay  : function(){
			return 'xxxx'
		}
	}*/

	//生成正常用户列表
	var normalPage;
	function getNormalList ( url , search ){
		getData( url ,  {			
			"p"   : 0,
			"num" : Global.num,
			"type": "normal"
		} , function(data){
			console.log(data);
			showData ( data.list , Doom.userList_template[0] , Doom.userList[0]);			

			normalPage = new Paging( $("#user_paging") , Math.ceil(data.count/Global.num) , function(page){
				getData ( url , {
					"p"   : page,
					"num" : Global.num,
					"type": "normal"
				}, function(data){
					showData ( data.list , Doom.userList_template[0] , Doom.userList[0]);
				});
			});
		} , search);
	}

	getNormalList("/user/GetUserList");

	//生成黑名单列表
	var blackPage;
	function getBlackList ( url , search ){
		getData( url ,  {		
			"p"   : 0,
			"num" : Global.num,
			"type": "black"
		} , function(data){
			showData ( data.list , Doom.darknameList_template[0] , Doom.darknameList[0]);
			blackPage = new Paging( $("#darkname_paging") , Math.ceil(data.count/Global.num) , function(page){
				getData ( url , {					
					"p"   : page,
					"num" : Global.num,
					"type": "black"
				}, function(data){
					showData ( data.list , Doom.darknameList_template[0] , Doom.darknameList[0]);
				});
			});
		} , search);
	}

	getBlackList("/user/GetUserList");

	//生成禁言列表
	var nospeakPage;
	function getNospeakList ( url , search ){
		getData( url ,  {			
			"p"   : 0,
			"num" : Global.num,
			"type": "nospeak"
		} , function(data){
			showData ( data.list , Doom.shutupList_template[0] , Doom.shutupList[0] );
			nospeakPage = new Paging( $("#darkname_paging") , Math.ceil(data.count/Global.num) , function(page){
				getData ( url , {					
					"p"   : page,
					"num" : Global.num,
					"type": "nospeak"
				}, function(data){
					showData ( data.list , Doom.shutupList_template[0] , Doom.shutupList[0] );
				});
			});
		} , search);
	}

	getNospeakList ( "/user/GetUserList" );
	
	/* 获取单个用户的详细信息 , 详情查看  */
	function getUserDetail ( id ){
		getData( "/user/Details" , {			
			"uid": id
		} , function(data){
			console.log(data);
			var arr = [data];
			showData( arr , Doom.user_info_template , Doom.user_info )
		});
	}

	Doom.USERPAGE.delegate(".JS_userDetail" , "click" , function(){
		getUserDetail ( $(this).attr("data-id") );
		Doom.userInfoModal.modal("show");
	});



});