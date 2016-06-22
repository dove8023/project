/*
 *  author  : Mr. He
 *	time    : 2016/1/5
 *	content : 用户管理各个列表数据及搜索功能
 */

require(['Bootstrap' , 'APP/common_use' , 'DateTimePicker' , 'DatePicker' , 'angular' , './pages/user/user_filter'] , function(Bootstrap , Common , DateTimePicker , DatePicker , angular , user_filter){

	var transform = Common.transform;

	var app = angular.module("UserManage" , ['UserFilter']);

	/* 列表类型 */
	app.controller("TabChange" , function( $scope , $http , $rootScope ){
		/* 保存每个列表请求数据的接口 和 tabContent中对应的类型 */
		$scope.tabs = [
			{ "name" : "编辑用户" , "type" : "editer" },
			{ "name" : "所有用户" , "type" : "alluser" },
			{ "name" : "黑名单用户", "type": "blackuser" },
			{ "name" : "禁言用户" , "type" : "nosay" },
			{ "name" : "推荐用户" , "type" : "recommenduser"}
		];

		$rootScope.tabContent = {
			"editer" : false,
			"alluser":false,
			"blackuser" : false,
			"nosay" : false,
			"recommenduser" : false
		};		

		/* 列表 tab 切换 ， */
		$scope.change = function($index , item){
			localStorage.setItem("userPageTabIndex", $index);

			//active 选择修改
			for(var i=0,len=$scope.tabs.length;i<len;i++){
				$scope.tabs[i].show = false;
			}
			item.show = true;
			//切换展示列表
			for(var str in $rootScope.tabContent){
				$rootScope.tabContent[str] = false;
			}
			$rootScope.tabContent[item.type] = true;

			//更新数组数据
			var param = { "p":0 , "num" : 15 };
			switch(item.type){
				case "editer":				
					param.type = "editer";
					break;
				case "alluser":
					param.type = "normal";
					break;
				case "blackuser":
					param.type = "black";
					break;
				case "nosay":
					param.type = "nospeak";
					break;
				case "recommenduser":
					param.type = "recommend";
					break;			
			}
			//保存请求当前列表的url和参数
			$rootScope.currentParam = {
				"url" : "/user/GetUserList",
				"param": param
			}			
			GetData($http , $rootScope , true);		
		}

		//默认首页话题展示操作 ，根据localStorage记录操作
		var whichTab = localStorage.getItem("userPageTabIndex") / 1;
		if(whichTab){
			$scope.change(whichTab , $scope.tabs[whichTab]);
		}else{
			$scope.change(0 , $scope.tabs[0]);
		}
	});

	/* 获取新的数组, 仅用于显示话题列表数据请求 ，请求url , 请求参数都从$rootScope中获取 */
	function GetData( $http , $rootScope , wirteCount){
		$rootScope.NoData = false;
		$http.post($rootScope.currentParam.url , $rootScope.currentParam.param , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			console.log(data);
			$rootScope.showlist = [];
			if(!data.d.list || data.d.list.length == 0){
				// alert("没有记录");
				$rootScope.Count = data.d.count;
				$rootScope.NoData = true;
				return false;
			}
			
			$rootScope.showlist = data.d.list;		
			if(wirteCount){
				$rootScope.Count = data.d.count;
			}
		});
	}

	app.controller("UserList" , ['$scope' , '$http' , '$rootScope' , function($scope , $http , $rootScope){
		$rootScope.NoData = false;
		$scope.goDetail = function(id){
			window.open("/index/userDetail?id="+id);
		}
	}]);

	app.controller("Page" , ['$scope' , '$http' , '$rootScope' , function($scope , $http , $rootScope){
		//根据$rootScope.count的改变显示的总页数
		$scope.$watch("Count" , function(newValue , oldValue){
			if(newValue == undefined){
				$scope.pages = 0;
				return;
			}
			$scope.pages = Math.ceil($rootScope.Count / 15);
			$   .currentPage = 1;
		});	


		//修改当前显示页数
		$rootScope.currentPage = 1;
		$scope.prev = function(){
			if($rootScope.currentPage <= 1){
				return false;
			}
			$rootScope.currentPage = --$rootScope.currentPage;
		}
		$scope.next = function(){
			if($rootScope.currentPage >= $scope.pages){
				return false;
			}
			$rootScope.currentPage = ++$rootScope.currentPage;
		}
		//监视currentPage的改变, 根据新的值发起请求
		$scope.$watch("currentPage" , function(newValue , oldValue){
			//刚刚打开时没有点开任何列表
			if(!$rootScope.currentParam){
				return false;
			}
			//更新页码参数
			$rootScope.currentParam.param.p = $rootScope.currentPage - 1;
			GetData($http , $rootScope);	
		});
		//跳转至第几页
		$scope.pageGo = function(){
			var enter = $scope.pageNumber;
			if(enter > 0 && enter <= $scope.pages){
				//修改当前显示页数
				$rootScope.currentPage = enter;
				$scope.pageNumber = "";
			}else{
				alert("输入页码无效");
				$scope.pageNumber = "";
			}
		}
	}]);

	/* 搜索功能 */
	app.controller("UserSearch" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$scope.SearchData = {};
		$scope.goSearch = function(){
			if(!$scope.SearchData.content){
				return false;
			}
			$rootScope.currentParam = {
				"url" : "/user/Search",
				"param": $scope.SearchData
			}

			GetData($http , $rootScope , true);

			setTimeout(function(){
				$scope.SearchData.content = "";
				$scope.$apply();
			} , 500);
		}
	}]);


	//启动angular
	angular.bootstrap(document,['UserManage']);
});