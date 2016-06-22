/*
 *  author  : Mr. He
 *	time    : 2016/1/14
 *	content : 个人中心，个人及管理用户信息编辑，帐户添加.
 */

require(['Bootstrap' , 'APP/common_use' , 'angular' , './pages/user/user_filter' , './libs/angular/angular-route'] , function(Bootstrap , Common , angular , user_filter , ngRoute){

	var ID = "",    //小号点击时保存小号ID
		AddUserModal ,		//帐号添加弹出模态框
		Authorize    = false,               //修改信息，初始为假，发起请求通过后允许
		transform = Common.transform;
	
	var AreaData;  //保存三级省市区数据

	var app = angular.module("UserInfoEditer" , ['UserFilter' , 'ngRoute']);
	var TplPath = "/static/js/tpls/user/";

	app.config(function($routeProvider){
		$routeProvider.when("/manageCount" , {
			templateUrl : TplPath + "manage_account.html",
			controller : "MyCountList"
		}).when("/editerInfo" , {
			templateUrl : TplPath + "editer_info.html",
			controller : "MainCtrl"
		}).otherwise({
			redirectTo : "/editerInfo"
		});
	});

	app.controller("TabCtrl" , ['$scope' , '$rootScope' , '$location' , function($scope , $rootScope , $location){
		$scope.editer = false;
		$scope.account = false;
		
		$scope.PageGo = function(str){
			location.hash = str;
			if(str == "editerInfo"){
				$scope.editer = true;
				$scope.account = false;
			}else{
				$scope.editer = false;
				$scope.account = true;
			}
		}
		
		$rootScope.$on("$locationChangeSuccess" , function(){
			if(location.hash == "#/editerInfo"){
				$scope.editer = true;
				$scope.account = false;
			}else{
				$scope.editer = false;
				$scope.account = true;
			}
		});
	}]);

	/* 信息编辑主要控制器 */
	/*
		$rootScope,
			UserDetail , 保存用户详细数据，初次由后台获取，修改保存时再提交.
	*/
	app.controller("MainCtrl" , ['$scope' , '$http' , '$rootScope' , function($scope , $http , $rootScope){

		$rootScope.UserDetail = {};
		//编辑权限验证，是否具备编辑该id权限，允许则展示该uid数据，否则跳转首页
		$http.post("/user/EditUserDetail" , {
			"uid" : ID,
			"o"   : 0
		} , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			if(data.d.auth == "false"){
				alert("你没有修改该用户的权限！");
				location.href = "/";
			}else{
				Authorize = true;
				$rootScope.UserDetail = data.d.data;
			}
			// console.log(data);
		});


		/* 省，市，区三级联动 */
		$scope.areaChange = false;
		$scope.areaChangeFn = function(){
			$scope.areaChange = true;
		}

		$scope.areaone = [];
		$scope.areatwo = [];
		$scope.areathree = [];
		$scope.choiceArea = {}; //选择结果保存
		$scope.changeArea = function(num){
			// console.log($scope.choiceArea)
			switch(num){
				case 1:
					if(!$scope.choiceArea.one){
						$scope.areatwo = [];
						$scope.areathree = [];
						return false;
					}
					$scope.areatwo = getAreaChoice( $scope.choiceArea.one.divisionCode );
					$scope.areathree = [];
					$scope.choiceArea.two = null;
					$scope.choiceArea.three = null;
					break;
				case 2:
					if(!$scope.choiceArea.two){
						$scope.areathree = [];
						return false;
					}
					$scope.areathree = getAreaChoice( $scope.choiceArea.two.divisionCode );
					$scope.choiceArea.three = null;
					break;
				case 3:
					break;
			}
		}

		/* 地址选择控制 */
		$http.get("/static/js/libs/global.json").success(function(data){
			AreaData = data;
			$scope.areaone = AreaData.provinces;
		});

		var pictureUpload = new Common.uploadFn({
			"btn" : "upload_cover_pic",
			"url" : '/upload/pics',
			"more": false,
			callback : function(data){
				if(!data.w || !data.h){
					alert("上传失败，请重传");
					return false;
				}
				document.getElementById('upload_cover_pic').children[0].src = data.url;
				$scope.UserDetail.head = data.url;
			}
		});

		/* 保存数据 */
		$scope.save = function(){
			//权限验证
			if(!Authorize){
				return false;
			}

			if(!$scope.UserDetail.nick){
				alert("用户名不能为空");
				return false;
			}

			if($scope.UserDetail.phone != ""){
				if(!phoneNumber($scope.UserDetail.phone)){
					alert("请输入有效电话号码");
					return false;
				}
			}

			//处理地址
			if($scope.choiceArea.one){
				$scope.UserDetail.province = $scope.choiceArea.one.divisionName;		
			}
			if($scope.choiceArea.two){
				$scope.UserDetail.city = $scope.choiceArea.two.divisionName;
			}else{
				$scope.UserDetail.city = "";
			}
			if($scope.choiceArea.three){
				$scope.UserDetail.street = $scope.choiceArea.three.divisionName;
			}else{
				$scope.UserDetail.street = "";
			}					
			
			$scope.UserDetail.uid = ID;
			$scope.UserDetail.o = 1;
			$http.post("/user/EditUserDetail" , $scope.UserDetail , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.d.e == 1){
					alert("修改成功");
					location.href = location.href;
				}
			});
		}		
	}]);

	/* 账号添加控制器 */
	app.controller("AddCountCtrl" , ['$scope' , '$http' , '$rootScope' , function($scope , $http , $rootScope){
		$scope.AddUser = {};

		$scope.SendData = function(){
			if(!$scope.AddUser.username){
				alert("用户名不能为空");
				return false;
			}
			if(!checkPwd($scope.AddUser.password)){
				alert("密码格式不正确");
				return false;
			}
			if(!$scope.AddUser.nick){
				alert("请输入一个昵称");
				return false;
			}

			$scope.AddUser.is_editer = 1; //默认添加编辑
			$http.post("/user/RegistUser" , $scope.AddUser , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					alert("添加成功");
					AddUserModal.modal("hide");
					setTimeout(function(){
						location.href = "/index/userinfoEditer?id="+data.d.id+"#/manageCount";
					} , 1500);
					
				}else{
					alert(data.d);
				}
			});
		}
	}]);


	app.controller("MyCountList" , ['$scope' , '$http' , '$rootScope' , function($scope , $http , $rootScope){
		AddUserModal = $("#addUser");
		/* 账号添加打开 */
		$scope.openAddModal = function(){
			AddUserModal.modal("show");
		}

		/* 获取所有小号列表 */
		$http.post("/user/GetSubAccountList").success(function(data){
			// console.log(data);
			if(data.c == 0){
				if(!data.d.length){
					$scope.NoData = true;
				}else{
					$scope.NoData = false;
				}
				$scope.showlist = data.d;
			}else{
				alert("列表获取失败");
			}
		});

		$scope.goEditerInfo = function( id ){
			ID = id;
			location.hash = "editerInfo";
		}
	}]);


	/*地理位置选择查询*/
	function getAreaChoice ( code ){
		var arr = AreaData[code];
		if(arr && arr.length){
			return arr;
		}else{
			return [];
		}
	}

	/* 11位手机号码验证 */
	function phoneNumber (str){
		if(/^1\d{10}$/.test(str)){
			return true;
		}else{
			return false;
		}
	}

	/* 6 ~ 20 位密码验证 only 数字、字母、下划线 */
	function checkPwd (str) {
		if (/^\S{6,20}$/.test(str)) {
			return true;
		}else{
			return false;
		}	
	}


	//启动angular
	angular.bootstrap(document,['UserInfoEditer']);
});