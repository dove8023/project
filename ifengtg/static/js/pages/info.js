/**
 * content@系统消息页面功能实现
*/

require(['Bootstrap' , 'APP/tab_change' , 'angular' , 'APP/ngPaging' , './pages/user/user_filter' , 'DateTimePicker' , 'APP/common_use'] , function(Bootstrap , Tab , angular , ngPage , user_filter , DateTimePicker , Common){

	var Doom = {
		"adsAdd"   : $("#adsAdd"),     //活动广告添加
		"adsAddContent" : $("#adsAddContent"), //活动广告添加内容框
		"otherAdd" : $("#otherAdd"),
		"twitter_platform" : $("#twitter_platform"),     //推送平台选择
		"twitter_platform_txt" : $("#twitter_platform_txt"), //推送平台显示
		"twitter_type_choice" : $("#twitter_type_choice"), //推送类型选择
		"twitter_type_input"  : $("#twitter_type_input"), // 推送其它信息输入框
		"save"    :  $("#save"),   //保存按钮
		"formE"   :  $("#formE"),  // form 表单
		"twitter_type" : $("#twitter_type"),  //安卓平台推送类型显示
		"tipVoice"     : $("#tipVoice"),      //ios 平台推送提示音显示
	};
	/* 推送平台选择功能 */
	Doom.twitter_platform.delegate("input[type=radio]" , "click" , function(){
		var str = $(this).attr("data-type");
		Doom.twitter_platform_txt.html(str).attr("data-platform" , str);

		if(str == "Android"){
			Doom.twitter_type.show();
			Doom.tipVoice.hide();
		}else if(str == "IOS"){
			Doom.twitter_type.hide();
			Doom.tipVoice.show();
		}else if(str == "Both"){
			Doom.twitter_type.show();
			Doom.tipVoice.show();
		}
	});

	/* 推送类型选择功能 */
	Doom.twitter_type_choice.delegate("input[type=radio]" , "click" , function(){
		//内容输入
		var target = Doom.twitter_type_input,
			targetFather = target.parent();

		target.val("");
		if(!$(this).attr("data-tip") || $(this).val() == 3){
			targetFather.hide();

			if($(this).val() == 3){
				var tip = $(this).attr("data-tip");
				tip = JSON.parse(tip);
				target.attr({ "placeholder" : tip.tip , "name" : tip.name });
				//open用户选择模态框
				$("#userChoice").modal("show");
			}
		}else{
			var tip = $(this).attr("data-tip");
			tip = JSON.parse(tip);
			target.attr({ "placeholder" : tip.tip , "name" : tip.name });
			if(tip.value){
				target.val(tip.value);
			}
			targetFather.show();
		}
	});
	

	var sendTimeTab = new Tab({
		"mainE" : $(".JS_tab_main2"),
		"contentE" : $(".JS_tab_Content2")
	});

	$("#dateTimePicker").datetimepicker({
		 format: 'yyyy-mm-dd hh:ii',
		 autoclose : true,
		 language : 'zh-CN'
	});	

	Doom.otherAdd.delegate("input[type=radio]" , "click" , function(){
		if($(this).attr("data-type") == "otherLink"){
			Doom.adsAddContent.show();
		}else{
			Doom.adsAddContent.hide().find("input").val("");
		}
	});

	var adsAddContentTab = new Tab({
		"mainE"    : $(".JS_tab_main3"),
		"contentE" : $(".JS_tab_Content3"),
		"active_class" : "btn-info"
	});

	var Global = {};    //记录单选框选择的值
	$(document).delegate("input[type=radio]" , "click" , function(){
		var names = this.name,
			val   = this.value;

		Global[names] = val;
	});

	//获取上传数据
	var UserId = [];
	function getSendData (){
		var sendData = {},
			formE = Doom.formE;		
		
		//推送内容
		sendData.content = formE.find('textarea[name="content"]').val();
		//推送平台
		if(Global.targetOS){
			sendData.targetOS = Global.targetOS;
		}else{
			sendData.targetOS = formE.find('input[name="targetOS"]').val();
		}	

		//推送筛选
		if(Global.twitter_obj){
			sendData.twitter_obj = Global.twitter_obj;
		}else{
			sendData.twitter_obj = formE.find('input[name="twitter_obj"]').val();
		}
		

		if(sendData.twitter_obj != 0){
			var names = Doom.twitter_type_input.attr("name");
			//如果是单个设备
			if(names == "device"){
				//获取用户uid数组
				if(!UserId.length){
					alert("没有选择推送用户");
					return false;
				}
				sendData.uid = UserId.join(",");
			}else{
				sendData[names] = Doom.twitter_type_input.val();
				sendData.condition = formE.find('input[name="condition"]').val();
			}
			
		}

		//推送时间
		if(Global.sendtime){
			sendData.sendtime = Global.sendtime;
		}else{
			sendData.sendtime = formE.find('input[name="sendtime"]').val();
		}		
		if(sendData.sendtime == 2){
			sendData.sendTimeStr = formE.find('input[name="sendTimeStr"]').val();
		}


		if(sendData.targetOS == 1){
			//安卓平台
			//Android推送类型
			if(Global.type){
				sendData.type = Global.type;
			}else{
				sendData.type = formE.find('input[name="type"]').val();
			}
		}else if(sendData.targetOS == 2){
			//ios平台

			//iphone推送提示音
			sendData.iosSound = formE.find('input[name="iosSound"]').val();
			//iphone推送角标数字
			sendData.iosBadge = formE.find('input[name="iosBadge"]').val();
		}else{
			//Both
			if(Global.type){
				sendData.type = Global.type;
			}else{
				sendData.type = formE.find('input[name="type"]').val();
			}

			sendData.iosSound = formE.find('input[name="iosSound"]').val();
			//iphone推送角标数字
			sendData.iosBadge = formE.find('input[name="iosBadge"]').val();
		}
		
		//附加字段选择类型

		if(Global.message_type){
			sendData.message_type = Global.message_type;
		}else{
			sendData.message_type = formE.find('input[name="message_type"]').val();
		}
		

		if(sendData.message_type == 1){
			//话题/活动/广告			
			if(Global.sub_messagetype){
				sendData.sub_messagetype = Global.sub_messagetype;
			}else{
				sendData.sub_messagetype = formE.find('input[name="sub_messagetype"]').val();
			}
			if(sendData.sub_messagetype == 1){
				//话题详情id
				sendData.topic_id = formE.find('input[name="topic_id"]').val();
			}else if(sendData.sub_messagetype == 2){
				//链接地址
				sendData.detail_url = formE.find('input[name="detail_url"]').val();
			}
		}
		return sendData;
	}


	Doom.save.click(function(event){
		event.preventDefault();

		var obj = getSendData();
		if(!obj){
			return false;
		}
		/*console.log(obj);
		return;*/
		$.ajax({
			"url" : "/push/push",
			"dataType" : "json",
			"type" : "post",
			"data" : obj,
			success : function(data){
				if (data.c == 0)
				{
					alert('success');
					window.location.reload();
				}
				else
				{
					alert(data.m);
				}
				console.log(data);
			},
			error  : function(){     
				alert("ajax 发送错误");
			}
		});
	});

	/**
	 * 用户选择控制
	 * time   @2016.2.2
	 * content@点击单个设备时，选择推送目标用户 
	*/
	var app = angular.module("Info" , ["ngPage" , "UserFilter"]);
	var transform = Common.transform;
	app.controller("UserList" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){

		//获取用户数据
		$rootScope.EveryPage = 20;
		$scope.count = 0;
		$scope.list = [];
		$scope.getUsers = function( page , Boolean ){
			$http.post("/user/list" , {
				"p" : page,
				"num" : $rootScope.EveryPage
			}, {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				$scope.list = data.d.list;
				if(Boolean){
					$scope.count = 0;
					$scope.count = data.d.count;
				}
				
				console.log(data);
				//判断当前列表是否包含被选择过的项
				for(var i=0,len=$scope.list.length;i<len;i++){
					for(var m=0,len2=$scope.Choiced.length;m<len2;m++){
						if($scope.Choiced[m].id == $scope.list[i].id){
							$scope.list[i].ShowHere = true;
						}
					}
				}
			});
		}

		$scope.getUsers(1 , true);
		
		//checkbox点击
		$scope.checkboxGo = function(item){
			if(item.ShowHere){
				//添加进数组中
				$scope.addItem(item);
			}else{
				//从数组中删掉
				$scope.choiceDelet(item);
			}
		}

		//已经选择的数据
		$scope.Choiced = [];
		//从数组里删除
		$scope.choiceDelet = function(item){
			var id = item.id;
			//删除已选择区
			for(var i=0,len=$scope.Choiced.length;i<len;i++){
				if($scope.Choiced[i].id == id){
					$scope.Choiced.splice(i,1);
					break;
				}
			}
			//重置列表中的checkbox
			for(var j=0,len2=$scope.list.length;j<len2;j++){
				if($scope.list[j].id == id){
					$scope.list[j].ShowHere = false;
					return;
				}
			}
		}
		//清空数组
		$scope.ClearAll = function(){
			$scope.Choiced = [];
			for(var i=0,len=$scope.list.length;i<len;i++){
				$scope.list[i].ShowHere = false;
			}
		}

		//添加进数组
		$scope.addItem = function(item){
			var id = item.id;
			for(var i=0,len=$scope.Choiced.length;i<len;i++){
				if($scope.Choiced[i].id == id){
					return false;
				}
			}
			$scope.Choiced.push(item);
		}

		//保存
		$scope.saveChoice = function(){
			var arr = [];
			for(var i=0,len=$scope.Choiced.length;i<len;i++){
				arr.push($scope.Choiced[i].id);
			}
			UserId = arr;
			$("#userChoice").modal("hide");
		}

	}]);


	/* 待发布消息查看 */
	app.controller("Box" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		//tab change
		$scope.sendInfo = true;
		$scope.list     = false;

		$scope.tabChange = function(str){
			if(str == "sendInfo"){
				$scope.sendInfo = true;
				$scope.list     = false;
			}else{
				$scope.sendInfo = false;
				$scope.list     = true;
				//刷新列表重新获取数据
				$scope.getList();
			}
		}

		$scope.ListData = [];

		$scope.getList = function(){
			$http.post("/push/schedule").success(function(data){
				$scope.ListData = data.d.list;
			});
		}

		$scope.delet = function(item){
			alert(item.id);
		}
	}]);





	//启动angular
	angular.bootstrap(document,['Info']);
});