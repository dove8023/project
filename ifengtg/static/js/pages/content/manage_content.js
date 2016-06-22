/*
 *  author  : Mr. He
 *	time    : 2015/12/21
 *	content : 内容管理页面，首页话题管理 ，广场话题管理 ，推荐话题管理 ， Banner管理 ，固定位置管理列表展示 和 各列表对应功能实现
 */

/*
 *	$rootScope 对应属性说明
 *	tabContent, Object ,  属性对应各个列表，值为真时展示该列表，同时对应操作框中相应的操作功能
 *	currentParam , Object , { url , param }	, 保存请求当前列表的url和参数 , 主要用在对应操作需刷新该列表时使用
 *	showlist  ,  Array ,  页面中 angular 实时展示数组 ，列表切换结果都将挂在该数组上。
 *  count   ,   string/Number  ,  记录当前列表的数目 ，仅在tab切换列表时重写count值.
 *  currentPage , string/Number , 记录当前显示列表的页数，在分页管理控制器中，检测count的变化，count变化时重写为1
 *  editorBanner , string/Number , Banner列表 ，编辑单条记录时传递ID值 给bannerEditor 控制器
 *  editorDirectID , string/Number , 固定位置列表 , 编辑单条 固定位置记录时 传递ID值 给directEditor 控制器
*/


require(['Bootstrap' , 'APP/common_use' , 'DateTimePicker' , 'DatePicker' , 'angular'] , function(Bootstrap , Common , DateTimePicker , DatePicker , angular){

 	$("#dateTime").datetimepicker();
 	$("#dateTime2").datetimepicker();
	$(".JS_date").datepicker();

	var transform = Common.transform;

	var app = angular.module("All" , []);
	//过滤器
	app.filter("toTime" , function(){
		var toTimeFn = function(input){
			return input && input.toString().datechange();
		};
		return toTimeFn;
	});

	app.filter("cover_pic" , function(){
		return function (input){
			/*try{
				input = JSON.parse(input);
				if(!input){
					return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
				}
			}catch(e){
				return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
			}*/
			if(!input || !input.length){
				return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
			}
			return input[0].url;
		}
	});
	app.filter("headPic" , function(){
		return function (input){
			if(!input){
				return "http://mypic.ifeng.com/upload/upload/2015/11/24/1d06ab68d553eaca1448360374.png";
			}else{
				return input;
			}
		}
	});

	/* 列表类型 */
	app.controller("TabChange" , function( $scope , $http , $rootScope , $timeout ){
		/* 保存每个列表请求数据的接口 和 tabContent中对应的类型 */
		$scope.tabs = [
			{ "name" : "首页话题" , "type" : "index" , "dataUrl" : "/topic/GetTopicList" },
			{ "name" : "广场话题" , "type" : "square" , "dataUrl" : "/topic/GetTopicList" },
			{ "name" : "推荐列表" , "type" : "recommend" , "dataUrl" : "/topic/GetTopicList" },
			{ "name" : "Banner" , "type" : "banner" , "dataUrl" : "/topic/GetBannerPositionList" },
			{ "name" : "固定位置" , "type" : "direct" , "dataUrl" : "/topic/GetAdPositionList" },
			{ "name" : "待发布" , "type" : "unpublished" , "dataUrl" : "/topic/GetWaitingPublishList" },
			{ "name" : "活动列表" , "type" : "activelist" , "dataUrl" : "/topic/GetTopicNoCacheList" },
		];

		$rootScope.tabContent = {
			"index" : false,
			"square":false,
			"recommend" : false,
			"banner" : false,
			"direct" : false,
			"unpublished" : false,
			"activelist" : false
		};

		/* 列表 tab 切换 ， */
		$scope.change = function($index , item){
			localStorage.setItem("ContentPageTabIndex", $index);

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
			var param;
			switch(item.type){
				case "index":
					param = {"p":0,"recommend":2,"num":15};
					break;
				case "square":
					param = {"p":0,"recommend":0,"num":15};
					break;
				case "recommend":
					param = {"p":0,"recommend":1,"num":15};
					break;
				case "banner":
					param = {"p":0,"num":15};
					break;
				case "direct":
					param = {"p":0,"num":15};
					break;
				case "unpublished" :
					param = {"p" : 0, "num" :15};
					break;
				case "activelist":
					param = {"p":0,"recommend":3,"num":15,"is_topic":3};
					break;
			}
			//保存请求当前列表的url和参数
			$rootScope.currentParam = {
				"url" : item.dataUrl,
				"param": param
			}
			GetData($http , item.dataUrl , param , $rootScope , true);

			$rootScope.DateE = (+new Date()).toString().substr(0,10);
		}

		//默认首页话题展示操作 ，根据localStorage记录操作
		var whichTab = localStorage.getItem("ContentPageTabIndex") / 1;
		if(whichTab){
			$scope.change(whichTab , $scope.tabs[whichTab]);
		}else{
			$scope.change(0 , $scope.tabs[0]);
		}


	});

	/* 搜索功能 */
	app.controller("SearchData" , [ '$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$scope.data = { "tag" : "" };

		$http.post("/Tag/List" , {}).success(function(data){
			if(data.c != 0){
				alert("标签列表获取失败");
				return false;
			}
			$scope.tags = data.d.list;

		});

		var searchTimeBegin = $("#searchTimeBegin"),
			searchTimeEnd   = $("#searchTimeEnd");

		$scope.goSearch = function(){
			$scope.data.beginTime = searchTimeBegin.val();
			$scope.data.endTime   = searchTimeEnd.val();

			//重写$rootScope.currentParam 参数对象 , 定义新的参数
			$rootScope.currentParam.url = "/topic/Search";
			$rootScope.currentParam.param = $.extend($rootScope.currentParam.param , $scope.data);

			GetData($http , $rootScope.currentParam.url , $rootScope.currentParam.param , $rootScope , true);
		}
	}]);

	/* 轮播属性 */
	app.controller("BannerPlay" , [ '$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$scope.saveBannerPlay = function(){
			var num = $rootScope.bannerplayset.num,
			space = $rootScope.bannerplayset.space;
			if(!isNaN(num) && !isNaN(space)){
				$http.post("/banner/BannerPlaySetEdit" , {'num':num,'space':space} , {
					headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					transformRequest: transform
				}).success(function(data){
					if(data.c == 0){
						alert('修改成功');
					}else{
						alert(data.d);
					}
				});
			}else{
				alert('必须为数字');
			}
		}
	}]);

	/* 获取新的数组, 仅用于显示话题列表数据请求 ，请求url , 请求参数都从$rootScope中获取 */
	function GetData( $http , url , params , $rootScope , wirteCount){
		$http.post(url , params , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			console.log(data);
			$rootScope.showlist = [];
			if(!data.d.list || data.d.list.length == 0){
				// alert("没有记录");
				return false;
			}

			$rootScope.showlist = data.d.list;
			if(wirteCount){
				$rootScope.count    = data.d.count;
			}

			if(data.d.bannerplayset){
				$rootScope.bannerplayset = data.d.bannerplayset;
			}
		});
	}

	/* 数据列表中的功能操作 */
	app.controller("DataList" , function($scope , $http , $rootScope){

		//详情查看
		$scope.goDetail = function( item ){
			console.log(item);
			switch(item.contenttype){
				case "1":
					//图文
					window.open("/index/topicNormal?type=editor&id="+item.id);
					break;
				case "3":
					//视频
					window.open("/index/topicVideo?type=editor&id="+item.id);
					break;
				case "4":
					//直播
					window.open("/index/topicLive?type=editor&id="+item.id);
					break;
				case "5":
					//H5
					window.open("/index/topicH5?type=editor&id="+item.id);
					break;
				case "7":
					//H5
					window.open("/index/topicActive?type=editor&id="+item.id);
					break;
			}
		}
		//删除该条数据
		$scope.deleteFn = function( $index , item ){
			if(!confirm("确定删除该条数据?")){
				return false;
			}
			$http.post("/topic/DelTopicStrong" , { "ids" : item.id , "recommend" : item.recommend } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				$rootScope.showlist.splice($index , 1);
			});
		}

		//首页话题 ，排序功能
		$scope.toTop = function( $index , item ){
			$http.post("/topic/TopicTop" , { "recommend" : item.recommend , "id" : item.id } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					$rootScope.showlist.splice($index , 1);
					if($rootScope.currentPage == 1){
						$rootScope.showlist.unshift(item);
					}
				}
			});
		}
		$scope.goUp = function( $index , item ){
			if($index == 0){
				alert("暂不支持跨页排序");
				return false;
			}
			UpAndDown( $index , item , $index - 1 , $rootScope.showlist[$index - 1] , $rootScope.showlist , $http);
		}
		$scope.goDown = function( $index , item ){
			if(!$rootScope.showlist[$index + 1]){
				alert("暂不支持跨页排序");
				return false;
			}
			UpAndDown( $index , item , $index + 1 , $rootScope.showlist[$index + 1] , $rootScope.showlist , $http);
		}

		//首页话题添加至Banner
		$scope.toBanner = function( $index , id ){
			PositionSwitch( $index , { "ids" : id , "oldposition" : 1 , "position" : 3,"action" : 1 } , $http , $rootScope );
		}
		//首页话题添加至固定位置
		$scope.toPermanent = function( $index , id ){
			PositionSwitch( $index , { "ids" : id , "oldposition" : 1 , "position" : 2,"action" : 1 } , $http , $rootScope );
		}

		//Banner列表
		$rootScope.editorBanner = {};
		$scope.editorBannerfn = function($index , id){
			$rootScope.editorBanner.id = id;
			$("#BannerModel").modal("show");
		}
//////////////////////////////
		$scope.editorRecoverModel = function( $index , id ){
			$rootScope.editorBanner.id = id;
			$("#BannerRecoverModel").modal("show");
		}
		//////////////////////
		$scope.editorRecover = function( $index , id ){
			PositionSwitch( $index , { "ids" : id , "oldposition" : 3 , "position" : 1,"action" : 1 } , $http , $rootScope );
		}

		//固定位置列表
		$scope.editorDirect = function( $index , id ){
			$rootScope.editorDirectID = id;
			$("#directModal").modal("show");
		}
		$scope.DirectRecover = function( $index , id ){
			PositionSwitch( $index , { "ids" : id , "oldposition" : 2 , "position" : 1,"action" : 1 } , $http , $rootScope );
		}

		//广场话题推荐功能
		$scope.squreRecommend = function( $index , id ){
			$http.post("/topic/AddRecommendTopic" , { "ids" : id , "recommend" : 1 } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				if(data.c == 0){
					$rootScope.showlist.splice($index , 1);
				}else{ alert("推荐话题错误"); }
			});
		}

		//广场话题隐藏话题功能
		$scope.hideTopic = function( $index , id ){
			$http.post("/topic/HideTopic" , { "ids" : id , "recommend" : 0 } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				if(data.c == 0){
					$rootScope.showlist.splice($index , 1);
				}else{ alert("隐藏话题错误"); }
			});
		}

		//推荐话题列表取消推荐
		$scope.cancelRecommend = function( $index , id ){
			if(!confirm("确定取消推荐该话题?")){
				return false;
			}

			$http.post("/topic/AddRecommendTopic" , { "ids" : id , "recommend" : 0 } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					$rootScope.showlist.splice($index , 1);
				}else{ alert("请重试"); }
			});
		}

	});

	/* Banner属性编辑 */
	app.controller("bannerEditor" , function( $scope , $http , $rootScope ){
		$scope.$watch("editorBanner.id" , function(newValue){
			if(!$rootScope.editorBanner.id){
				return false;
			}
			$scope.data = {};
			$http.post("/banner/GetBannerData" , { "id" : newValue } ,
			{
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				$scope.data = data.d;
			});
		});

		$scope.save = function(){
			if(!($scope.data.weight / 1) || $scope.data.weight < 0){
				alert("排序权重为正数");
				return false;
			}
			$scope.data.endtime = $("#dateTime").val();
			if($scope.data.endtime == ""){
				alert("请选择有效的时间");
				return false;
			}

			$http.post("/banner/BannerEdit" , $scope.data , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					$("#BannerModel").modal("hide");
					//刷新列表
					GetData($http , $rootScope.currentParam.url , $rootScope.currentParam.param , $rootScope);
				}else{ alert("保存出错，请重试。"); }
			});
		}
	});

	/* 固定位置相关属性设置 */
	app.controller("directEditor" , function( $scope , $http , $rootScope ){
		$scope.$watch("editorDirectID" , function(newValue){
			if(!$rootScope.editorDirectID){
				return false;
			}

			$scope.data = {};
			$http.post("/ad/GetAdData" , { id : newValue } , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				console.log(data);
				$scope.data = data.d;
			});
		});

		$scope.save = function(){
			if(!($scope.data.start / 1) || $scope.data.weight <= 0){
				alert("起始位置为不能小于0");
				return false;
			}
			if(!($scope.data.step / 1) || $scope.data.weight < 0){
				alert("步进长度为不能小于0");
				return false;
			}
			if(!($scope.data.num / 1) || $scope.data.weight < 0){
				alert("数量为不能小于0");
				return false;
			}
			if(!($scope.data.weight / 1) || $scope.data.weight < 0){
				alert("权重为不能小于0");
				return false;
			}
			$scope.data.endtime = $("#dateTime2").val();

			if($scope.data.endtime == ""){
				alert("请选择有效的时间");
				return false;
			}

			$http.post("/ad/AdEdit" , $scope.data , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					$("#directModal").modal("hide");
					//刷新列表
					GetData($http , $rootScope.currentParam.url , $rootScope.currentParam.param , $rootScope);
				}else{ alert("保存出错，请重试。"); }
			});
		}
	});





	/* 上下排序功能接口请求函数 */
	function UpAndDown ( index , item , index2 , item2 , arr , $http){
		//准备数据
		var sendData = {};
		sendData.id = item.id;
		sendData.score = item.score;
		sendData.id2 = item2.id;
		sendData.score2 = item2.score;
		sendData.recommend = item.recommend;
		//交互分数值
		var lastScore = item.score;
		item.score = item2.score;
		item2.score = lastScore;
		//改变在数组中的位置
		arr[index] = item2;
		arr[index2] = item;

		$http.post("/topic/TopicTop", sendData , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			console.log(data);
		});
	}

	/*  位置切换接口请求函数 */
	function PositionSwitch ($index , param , $http , $rootScope){
		$http.post("/topic/positionSwitch" , param , {
			headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			transformRequest: transform
		}).success(function(data){
			if(data.c == 0){
				$rootScope.showlist.splice($index , 1);
			}else{ alert("位置修改出错"); }
		});
	}

	/* 分页控制器 */
	app.controller("page" , function($scope , $http , $rootScope){
		//根据$rootScope.count的改变显示的总页数
		$scope.$watch("count" , function(newValue , oldValue){
			if(newValue == undefined){
				$scope.pages = 0;
				return;
			}
			$scope.pages = Math.ceil($rootScope.count / 15);
			$rootScope.currentPage = 1;
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
			GetData($http , $rootScope.currentParam.url , $rootScope.currentParam.param , $rootScope);
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
			}
		}
	});





	//启动angular
	angular.bootstrap(document,['All']);
});