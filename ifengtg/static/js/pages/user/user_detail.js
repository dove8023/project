/*
 *  author  : Mr. He
 *	time    : 2016/1/5
 *	content : 用户详情查看 , 恢复默认头像 , 恢复默认昵称 , 加入黑名单 ,        禁言操作 , 留言 , 回复 , 发布话题 等查看 , 删除操作  
 */

require(['Bootstrap' , 'APP/common_use' , 'angular' , './pages/user/user_filter' , './libs/angular/angular-route' , 'APP/ngPaging'] , function(Bootstrap , Common , angular , user_filter , ngRoute , ngPage){

	var transform = Common.transform;
	var ID = Common.dealurl("id" , "?"),
		ReasonModal = $("#reasonModal");    //黑名单，禁言模态框
		ID = ID.replace( /\D/g, "");

	var app = angular.module("UserDetail" , ["UserFilter" , "ngRoute" , "ngPage"]);
	//刷新页面时清除hash值
	location.hash = "";
	
	/* 
	 * rootScope属性说明 ： 
	 * userData  , 后台获取的所有数据
  	 * ReasonParam , object , 加入黑名单禁言操作原因写入参数
  	 * 
	 */

	/* 获取、展示用户信息 */
	app.controller("UserInfo" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$rootScope.userData = {};
		// 获取用户信息
		$http.post("/user/Details" , {
			"uid" : ID
		} , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			console.log(data);
			$rootScope.userData = data.d;		
		});
	}]);

	/* ========================================= */

	/* 对该用户各项操作控制，操作记录展示、获取 */
	app.controller("UserOption" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http ){
		$scope.setDefaultImg = function(){
			$rootScope.ReasonParam = {};
			$rootScope.ReasonParam.type = "head";
			if(confirm("确定恢复默认头像?")){
				$rootScope.SendData();
			}
		}

		$scope.setDefaultName = function(){
			$rootScope.ReasonParam = {};
			$rootScope.ReasonParam.type = "nick";
			if(confirm("确定恢复默认昵称?")){
				$rootScope.SendData();
			}		
		}

		$scope.joinBlack = function(Boolean){
			$rootScope.ReasonParam = {};
			$rootScope.ReasonParam.type = "black";
			if(Boolean){
				//加入黑名单
				$rootScope.ReasonParam.title = "加入黑名单原因";
				$rootScope.ReasonParam.o = 1;		
			}else{
				//解除黑名单
				$rootScope.ReasonParam.title = "解除黑名单原因";
				$rootScope.ReasonParam.o = 0;
			}
			ReasonModal.modal("show");
		}

		$scope.joinNoSay = function(Boolean){
			$rootScope.ReasonParam = {};
			$rootScope.ReasonParam.type = "nospeak";
			if(Boolean){
				//加入禁言
				$rootScope.ReasonParam.title = "禁言原因";
				$rootScope.ReasonParam.o = 1;
			}else{
				//解除禁言
				$rootScope.ReasonParam.title = "解禁原因";
				$rootScope.ReasonParam.o = 0;
			}

			ReasonModal.modal("show");
		}

		$scope.ShowRecord = false;
		var lastType = "";
		//操作记录获取
		$scope.getRecord = function(type){
			$scope.RecordData = [];

			//再次点击时隐藏操作记录列表
			if(type == lastType && $scope.ShowRecord){
				$scope.ShowRecord = false;
			}else{
				$scope.ShowRecord = true;
				lastType = type;
			}
			$http.post("/user/GetOperationLog" , {
				"uid" : ID,
				"type": type
			} , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				if(!data.d.list){
					$scope.RecordData.push({"id":"无数据"});
				}else{
					$scope.RecordData = data.d.list;
				}				
			});
		}

		$scope.RecordData = [];
	}]);

	/* 黑名单、禁言，加入解除原因输入控制 */
	app.controller("Reason" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$rootScope.ReasonParam = {};
		$rootScope.SendData = function(){
			$rootScope.ReasonParam.uid = ID;
			if(($rootScope.ReasonParam.type == "nospeak" || $rootScope.ReasonParam.type == "black") && !$rootScope.ReasonParam.reason){
				alert("请输入理由");
				return false;
			}
			$http.post("/user/Operate" , $rootScope.ReasonParam , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				if(data.d.o == 1){
					//success
					ReasonModal.modal("hide");
					setTimeout(function(){
						//原地刷新
						location.href = location.href;
					} , 500);
				}else{
					//fail
					alert("修改失败请重试");
				}
				
			});
		}
	}]);

	/* ========================================= */

	/* 其它列表查看,路由配置,控制器指定 */
	var TplPath = "/static/js/tpls/user/";
	app.config(function($routeProvider){
		$routeProvider.when("/topiclist" , {
			templateUrl : TplPath + "user_topiclist.html",
			controller : "UserTopic"
		}).when("/review" , {
			templateUrl : TplPath + "user_review.html",
			controller : "UserReview"
		}).when("/leavemsg" , {
			templateUrl : TplPath + "user_leavemsg.html",
			controller : "UserMsg"
		});
	});



	/*  
	 * rootScope , 属性说明
	 * listArr  , [] , 保存列表数据
	 * EveryPage , 列表每页多少项
	*/
	app.controller("UserInfoList" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		//定义每页15条数据
		$rootScope.EveryPage = 15;

		$rootScope.listArr = [];

		$scope.listType = [
			{ "name" : "发布话题" , "url" : "/user/GetUserTopicList" , "type" : "TopicList"},
			{ "name" : "收藏话题" , "url" : "/user/GetUserFavoreList" , "type" : "FavoreList"},
			{ "name" : "点赞话题" , "url" : "/user/GetUserPraiseTopicList" , "type" : "PraiseList" },
			{ "name" : "分享话题"  , "type" : "shareList"},
			{ "name" : "回复列表" , "url" : "/comment/getRelateTopicList" ,"type" : "reviewList" , },
			{ "name" : "留言列表" , "url" : " /words/getUserWords" , "type" : "messageList"}
		];

		$scope.tabList = {
			"TopicList" : false,
			"FavoreList": false,
			"PraiseList": false,
			"shareList" : false,
			"reviewList": false,
			"messageList":false
		};

		// $scope.ListShow = false;  //初始隐藏列表

		$scope.listChange = function(index , item){
			//判断是否关闭列表框
			if($scope.tabList[item.type] && $scope.ListShow){
				$scope.ListShow = false;
				$scope.tabList[item.type] = false;
				return false;
			}
			
			//切换active显示情况
			for(var one in $scope.tabList){   
				$scope.tabList[one] = false;
			}
			$scope.tabList[item.type] = true;

			//导航切换
			switch(item.type){
				case "TopicList" :
				case "FavoreList" :
				case "PraiseList" :
					location.hash = "topiclist";
					break;
				case "shareList"  :
					alert("稍等，还在开发");
					return false;
				case "reviewList" :
					location.hash = "review";
					break;
				case "messageList" :
					location.hash = "leavemsg";
					break;
			}
			//显示列表框
			$scope.ListShow = true;
			//隐藏无数据提示
			$scope.NoData = false;			

			//如是留言列表直接退出
			if(item.type == "messageList"){
				return;
			}
			$scope.items = item;			
			//第一次获取数据
			$scope.getData(0 , true);
		}

		//记录tab切换的当前项发送数据信息
		$scope.items = null;		
		//当前列表总共多少条记录，由tab点击进行修改
		$scope.count = 0;		
		$scope.getData = function(page , Boolean){
			//清空现有列表数据
			$rootScope.listArr = [];
			var param = {"uid" : ID,"p" : page,"num" : $rootScope.EveryPage};
			
			$http.post($scope.items.url , param , {  
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				if(data.d.list.length){
					$scope.NoData = false;
					$rootScope.listArr = data.d.list;

					//仅tab切换的点击触发该操作,页面切换不触发
					if(Boolean){
						$scope.count = data.d.count;
					}					
				}else{
					$scope.NoData = true;
					$rootScope.listArr = [];
				}				
			});
		}				
	}]);

	app.controller("UserTopic" , ['$scope' , '$rootScope' , '$http' , function( $scope , $rootScope , $http ){

	}]);

	app.controller("UserReview" , ['$scope' , '$rootScope' , '$http' , function( $scope , $rootScope , $http ){
		$scope.getRepeat = function(item){
			if(item.show){
				item.show = false;
				return;
			}

			$http.post("/comment/getCommentListByUidAndTopicid" , {
				"uid" : ID,
				"tid" : item.id
			} , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				item.show = true;
				item.details = data.d;
			});
		}

		/* item,该条话题 , index,当前 */
		$scope.delet = function( item , index ){
			if(!confirm("确认删除该条评论")){
				return false;
			}	
			$http.post("/comment/deleteComment" , {
				"uid" : ID,
				"tid" : item.id,
				"cid" : item.details[index].id
			} , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					item.details.splice(index , 1);
				}else{
					alert("删除失败");
				}
			});
		}			
	}]);
	
	app.controller("UserMsg" , ['$scope' , '$rootScope' , '$http' , function( $scope , $rootScope , $http ){
		$scope.getList = [];
		$scope.sendList= [];

		$scope.getListShow = false;
		$scope.sendListShow = false;

		$scope.countGet = 0;  //总共收到多少条
		$scope.countSend = 0; //总共发出多少条
		$scope.getMsg = function( page , type , Boolean ){
			$http.post("/words/getUserWords" , {
				"uid" : ID,
				"p"   : page,
				"num" : $rootScope.EveryPage,
				"type": type
			} , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					if(type == "1"){
						$scope.getList = data.d.list;	
						if(Boolean){
							$scope.countGet = data.d.count;
						}	
					}else{
						$scope.sendList = data.d.list;
						if(Boolean){
							$scope.countSend = data.d.count;
						}	
					}
				}else{
					alert("数据获取失败");
				}
			});
		}
		
		//列表显示，关闭
		$scope.showList = function( type ){
			
			if(type == "1"){
				$scope.getListShow = !$scope.getListShow;
				if($scope.getListShow){
					$scope.getMsg( 0 , type , true );
				}
			}else{
				$scope.sendListShow = !$scope.sendListShow;
				if($scope.sendListShow){
					$scope.getMsg( 0 , type , true );
				}
			}		
		}

		$scope.delet = function( arr , index ){
			if(!confirm("确定删除该条留言")){
				return false;
			}

			$http.post("/words/deleteWord" , {
				"wid" : arr[index].id
			} , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					arr.splice(index , 1);
				}else{
					alert("删除失败");
				}
			});
		}
	}]);

	//启动angular
	angular.bootstrap(document,['UserDetail']);
});