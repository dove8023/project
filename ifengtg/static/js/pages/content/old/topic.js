/*
	时尚后台话题管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use' , 'DatePicker' , 'APP/paging'] , function(Bootstrap , Tab , Common , DatePicker , Paging){

	var TabMainE = $(".JS_tab_main");
	Tab({
		"mainE" : TabMainE,
		"active_class" : "active",
		"contentE" : $(".JS_tab_Content"),
		main_callback : function(obj){
			var type = obj.attr("data-type")
			Global.recommend = type;

			//刷新对应的列表数据
			switch(type / 1){
				case 2:
					getEditorList( "/topic/GetTopicList" );
					break;
				case 0:
					getUserList( "/topic/GetTopicList" );
					break;
				case 3:
					getBannerList( "/banner/bannerlist" );
					break;
				case 1:
					getRecommendList( "/topic/GetTopicList" );
					break;
				case 4:
					getAdList( "/topic/GetAdList" );
			}
			//复位搜索选择
			searchObj.reset();

			//保存当前点击状态
			sessionStorage.setItem("currentView" , type);
		}
	});

	var Global = {
		"recommend" : 0 ,   //记录当前操作类型 2,编辑发表; 0,普通用户发表; 3,banner列表; 1,推荐列表;
		"num"       : 15    //每页显示条数
	}	

	$(".JS_date").datepicker();

	var Doom = {
		"official_list" : document.getElementById('official_list'),
		"user_list"      : document.getElementById('user_list'),
		"banner_list"    : document.getElementById("banner_list"),
		"recommend_list" : document.getElementById("recommend_list"),
		"listTemplate" : document.getElementById('listTemplate'),
		"userlistTemplate" : document.getElementById('userlistTemplate'),
		"bannerlistTemplate" : document.getElementById("bannerlistTemplate"),
		"recommendlistTemplate" : document.getElementById("recommendlistTemplate"),
		"adlistTemplate" : document.getElementById('adlistTemplate'),
		"ad_list"       : document.getElementById('ad_list'),

		"official_btn" : $("#official_btn"),
		"normal_btn"   : $("#normal_btn"),
		"banner_btn"   : $("#banner_btn"),
		"topic_manage" : $("#topic_manage"),
		"topic_type_choice" : $("#topic_type_choice"),
		"tagesBox"     : $("#tages"),
	};

	//生成官方用户话题列表
	var editorPage;
	function getEditorList ( url , search ){
		getData( url , {		
			"p"   : 0,
			"recommend" : 2,
			"num" : Global.num 
		} , function(data){
			showData( data.list , Doom.listTemplate , Doom.official_list );
			//第一次生成 分页列表
			editorPage = new Paging( $("#paging1").find("ul") , Math.ceil(data.count/Global.num) , function(page){
				getData( url , {				
					"p"   : page,
					"recommend" : 2,
					"num" : Global.num 
				} , function(data){
					showData( data.list , Doom.listTemplate , Doom.official_list );
				} , search);
			});
		} , search);
	}	

	//生成普通用户话题列表
	var userPage;
	function getUserList ( url , search ){
		getData( url , {			
			"p"   : 0,
			"recommend" : 0,
			"num" : Global.num 
		} , function(data){
			showData( data.list , Doom.userlistTemplate , Doom.user_list );
			//分页列表
			userPage = new Paging( $("#paging2").find("ul") , Math.ceil(data.count/Global.num) , function(page){
				getData( url , {					
					"p"   : page,
					"recommend" : 0,
					"num" : Global.num 
				} , function(data){
					showData( data.list , Doom.userlistTemplate , Doom.user_list )
				} , search);
			});
		} , search);
	}

	//生成banner列表
	var bannerPage;
	function getBannerList ( url ){
		getData( url , {					
					"p"   : 0,
					"num" : Global.num 
				} , function(data){
			showData( data.list , Doom.bannerlistTemplate , Doom.banner_list , function(){
				//展示当前设置
				if(data.show){
					var app_banner = $(Doom.banner_list).find("#"+data.show).find(".JS_banner_app");
					app_banner.addClass("btn-primary").html("APP显示").attr("data-type" , "show");
				}
			});
			
			//分页列表
			bannerPage = new Paging( $("#paging3") , Math.ceil(data.count/Global.num) , function(page){
				getData( url , {
					"p"   : page,
					"num" : Global.num 
				}, function(data){
					showData( data.list , Doom.bannerlistTemplate , Doom.banner_list , function(){
						//展示当前设置
						if(data.show){
							var app_banner = $(Doom.banner_list).find("#"+data.show).find(".JS_banner_app");
							app_banner.addClass("btn-primary").html("APP显示").attr("data-type" , "show");
						}
					})
				});
			});
		});
	}

	//生成推荐列表
	var recommendPage;
	function getRecommendList ( url , search ){
		getData( url , {					
					"p"   : 0,
					"recommend" : 1,
					"num" : Global.num 
				} , function(data){		
			showData( data.list , Doom.recommendlistTemplate , Doom.recommend_list );
			//分页列表
			recommendPage = new Paging( $("#paging4") , Math.ceil(data.count/Global.num) , function(page){
				getData( url , { 				
					"p"   : page,
					"recommend" : 1,
					"num" : Global.num 
				}, function(data){
					showData( data.list , Doom.recommendlistTemplate , Doom.recommend_list )
				} , search);
			});
		} , search);
	}

	//生成广告列表
	var adPage;
	function getAdList ( url ){
		getData( url , {			
			"p"   : 0,
			"num" : Global.num,
			"is_topic" : 2
		} , function(data){
			console.log(data);
			showData( data.list , Doom.adlistTemplate , Doom.ad_list );
			//分页
			adPage = new Paging(  $("#paging5") , Math.ceil(data.count/Global.num) , function(page){
				getData( url , {				
					"p"   : page,
					"is_topic" : 2,
					"num" : Global.num 
				}, function(data){
					showData( data.list , Doom.adlistTemplate , Doom.ad_list );
				});
			});
		});
	}








	/* 获取数据方法 */
	function getData ( url , data , successfn , search ){
		if(search){
			data = $.extend( data , search );
		}
		Common.ajax({
			"url" : window.IP + url,
			"data" : data ,
			success : function(data){
				// console.log(data);
				if(data.c == 0){
					if(data.d){
						successfn(data.d);
					}else{
						successfn(data);
					}
				}else{
					alert("请求失败");
				}				
			}
		});
	}

	/* 展示数据方法 */
	function showData(arr , tempE , targetE , callback){
		var str = "",
			tempStr = tempE.innerHTML;
		if(arr.length == 0){
			targetE.innerHTML = "<h1>暂时没有数据</h1>";
			return false;
		}
		arr.forEach(function(obj){
			if(obj.publishtime){
				obj.publishtime = obj.publishtime.toString().datechange();
			}
			if(obj.ctime){
				obj.ctime = obj.ctime.toString().datechange();
			}
			if(obj.mtime){
				obj.mtime = obj.mtime.toString().datechange();
			}
			if(!obj.head){
				obj.head = "/static/images/default_head.png";
			}
			if(obj.type == 1){
				//图文混排
				obj.link = '<a target="_blank" href="/index/bannerImg?id='+obj.id+'&type=editor" class="btn btn-warning">编辑查看</a>';
				obj.content = "请进入详情查看";
			}
			if(obj.type == 2){
				//视频
				try{
					obj.content = JSON.parse(obj.content);
				}catch(e){
				}
				obj.content = '<img src="'+obj.content.picUrl.url+'" alt="视频配图" />';
				obj.link = '<a target="_blank" href="/index/bannerVideo?id='+obj.id+'&type=editor" class="btn btn-warning">编辑查看</a>';
			}			
			if(!obj.ext_title){
				obj.ext_title = "";
			}

			if(obj.adstatus){
				if(obj.adstatus == "2"){
					obj.adstatus = '<button class="btn btn-warning">未编辑</button>';
					obj.adstatus2 = '<button class="btn btn-warning JS_ad_operate" data-type="editor">去设置</button>';
				}else if(obj.adstatus == "1"){
					obj.adstatus = '<button class="btn btn-success">已上线</button>';
					obj.adstatus2 = '<button class="btn btn-success JS_ad_operate" data-type="go_down">下线</button>';
				}else if(obj.adstatus == "0"){
					obj.adstatus = '<button class="btn btn-default">已下线</button>';
					obj.adstatus2 = '<button class="btn btn-default JS_ad_operate" data-type="go_up">上线</button>';
				}
			}

			str += tempStr.temp(obj);
		});
		targetE.innerHTML = str;

		return callback && callback();
	}

	/* 获取标签列表 */
	getData ( "/Tag/List" , null , function(data){
		$('<option value="">标签选择</option>').appendTo(Doom.tagesBox);
		for(var i=0,len=data.list.length;i<len;i++){
			$('<option value="'+data.list[i].name+'">'+data.list[i].name+'</option>').appendTo(Doom.tagesBox);
		}
	});

	/* 搜索功能实现 */
	var searchObj = new SearchFn( $("#searchE") );
	function SearchFn ( btn ) {
		var _this = this;
		this.father    = btn.parent();
		this.beginTime = this.father.find(".JS_date").eq(0);
		this.endTime   = this.father.find(".JS_date").eq(1);
		this.tag       = this.father.find("select");
		this.contentE  = this.father.find(".JS_inputcontent");

		btn.click(function(){
			var type = Global.recommend;
			if(type == 3){
				alert("banner不提供搜索查找.");
				return false;
			}
			if(type == 4){
				alert("广告不提供搜索查找.");
				return false;
			}
			var data = _this.collectData();
			if(!data){
				return false;
			}
			data.recommend = type;

			switch(type / 1){
				case 2:
					getEditorList( "/topic/Search" , data );
					break;
				case 0:
					getUserList( "/topic/Search" , data );
					break;
				case 1:
					getRecommendList( "/topic/Search" , data );
					break;	
			}
		});
	}
	SearchFn.prototype.collectData = function(){
		var data = {};
		data.beginTime = this.beginTime.val();
		data.endTime   = this.endTime.val();
		data.tag       = this.tag.val();
		data.content  = this.contentE.val();
		if(data.beginTime > data.endTime){
			alert('结束时间不能小于开始时间.');
			return false;
		}
		return data;
	}
	SearchFn.prototype.reset = function(){
		this.beginTime.val('');
		this.endTime.val('');
		this.tag.val("");
		this.contentE.val('');		
	}	

	/* 删除某条话题 */
	Doom.topic_manage.delegate(".JS_topic_delete" , "click" , function(){
		if(!confirm("确定删除该条数据?")){
			return false;
		}
		var tr = $(this).parents("tr"),
			ids = tr.attr("id");
		Common.ajax({
			"url" : window.IP + "/topic/DelTopicStrong",
			"data": {				
				"ids" : ids,
				"recommend" : Global.recommend
			},
			success : function(){
				tr.remove();
			}
		});
	});

	/* 添加 , 删除推荐功能 */
	Doom.topic_manage.delegate(".JS_recommend" , "click" , function(){
		var tr = $(this).parents("tr"),
			ids = tr.attr("id"),
			type = $(this).attr("data-type");
		if(type == "add"){
			type = 1;
		}else{
			type = 0;
		}
		Common.ajax({
			"url" : window.IP + "/topic/AddRecommendTopic",
			"data": {				
				"ids" : ids,
				"recommend" : type
			},
			success : function(){
				tr.remove();
				recommendPage.refresh();
			}
		});
	});

	/* 广告操作 */
	Doom.topic_manage.delegate(".JS_ad_operate" , "click" , function(){
		var tr = $(this).parents("tr"),
			ids = tr.attr("id"),
			type = $(this).attr("data-type"),
			adstatus;  //记录操作类型
		if(type == "editor"){
			window.open("/index/ad?id="+ids+"&type=editor");
			return false;
		}else if(type == "go_down"){
			adstatus = 0;
		}else if(type == "go_up"){
			adstatus = 1;
		}
		Common.ajax({
			"url" : window.IP + "/ad/AdDel",
			"data": {				
				"id" : ids,
				"adstatus" : adstatus
			},
			success : function(data){
				if(data.c == 0){
					adPage.refresh();
				}else{
					alert(data.m);
				}
				
			}
		});
	});

	/* 排序功能 */
	Doom.topic_manage.delegate(".JS_sort" , "click" , function(){
		var sendData = {
			"recommend" : Global.recommend
		},         //请求发送数据
			url = "/topic/TopicTop",
			that = $(this),
			type = that.attr("data-type"),
			thisTr = that.parents("tr"),
			thisData = {
				"id" : thisTr[0].id,
				"score" : thisTr.attr("data-score")
			};

		//置顶操作
		if(type == "top"){
			sendData = $.extend(sendData , { "id" : thisTr[0].id });
			getData(url , sendData , function(data){
				if(data.c == 0){
					thisTr.remove();
					editorPage.refresh();   //后期判断类型
				}
			});
			return false;
		}

		var targetTr , targetData;
		if(type == "up"){
			targetTr = thisTr.prev();
		}else if(type == "down"){
			targetTr = thisTr.next();
		}else{
			alert("排序功能出错");
			return false;
		}

		if(!targetTr.length){
			alert("暂不支持跨页排序，稍等，正在开发");
			return false;
		}

		targetData = {
			"id2" : targetTr[0].id,
			"score2" : targetTr.attr("data-score")
		}

		sendData = $.extend( thisData , targetData , sendData );

		getData(url , sendData , function(data){
			if(type == "up"){
				targetTr.before(thisTr);
			}else{
				targetTr.after(thisTr);
			}

			var scoreThis = thisTr.attr("data-score"),
				scoreTarget = targetTr.attr("data-score");
			thisTr.attr("data-score" , scoreTarget);
			targetTr.attr("data-score" , scoreThis);
		});	
	});

	/* APP banner 设置修改 */
	Doom.topic_manage.delegate(".JS_banner_app" , "click" , function(){
		var that = $(this);
		if(that.attr("data-type") == "show"){
			return false;
		}
		var tr = that.parents("tr");

		getData( "/banner/SetBannerToTop" , { "id" : tr.attr("id") , "data-type" : tr.attr("data-type") } , function(data){

			if(data.id){				
				$(Doom.banner_list).find(".JS_banner_app").removeClass("btn-primary").html("设为显示").attr("data-type" , "normal");
				that.addClass("btn-primary").html("APP显示").attr("data-type" , "show");
				alert("APP banner展示修改成功");
			}
			
		});
	});



	


	//刷新时回到上次点击状态
	function showLastView (){
		var last = sessionStorage.getItem("currentView");
		if(last){
			last = last / 1;
			switch(last){
				case 2:
					TabMainE.eq(0).click();
					break;
				case 0:
					TabMainE.eq(1).click();
					break;
				case 3:
					TabMainE.eq(2).click();
					break;
				case 1:
					TabMainE.eq(3).click();
					break;
				case 4:
					TabMainE.eq(4).click();
					break;
			}
		}else{
			TabMainE.eq(0).click();
		}
	}
	showLastView ();
});