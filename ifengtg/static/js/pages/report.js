/**
 * content @ 举报管理脚本
*/

require(['Bootstrap' , 'APP/common_use', 'angular' , './pages/user/user_filter' , './libs/angular/angular-route' , 'APP/ngPaging'] , function(Bootstrap , Common , angular , user_filter , ngRoute , ngPage){
	
	var transform = Common.transform;
	var app = angular.module("Report" , ["UserFilter" , "ngRoute" , "ngPage"]);	

	/* tab切换功能 */
	app.controller("TabChange" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		$rootScope.Type = "topic"; //默认打开话题举报列表
		$rootScope.Tabs = [
			{ "text" : "话题举报列表" , "show" : false , "type" : "topic" },
			{ "text" : "评论举报列表" , "type" : "comment" },
			{ "text" : "举报原因管理" , "show" : false , "type" : "reportReason" }
		];

		$scope.showcontent = function( item ){
			//修改active显示，右侧栏切换
			for(var i=0,len=$rootScope.Tabs.length;i<len;i++){
				$rootScope.Tabs[i].show = false;
				item.show = true;
			}
			if(item.type != "reportReason"){
				$rootScope.Type = item.type;
				//执行未审核事件
				$rootScope.Show_Not_Audit();
			}
		}

		/* 默认打开话题举报列表,延时等待$rootScope.Show_Not_Audit定义 */
		setTimeout(function(){
			$scope.showcontent( $rootScope.Tabs[0] );
		} , 400);
		

		$rootScope.ajax = function( url , params , callback ){
			$http.post(url , params , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				return callback && callback(data);
			});
		}
	}]);

	/**
	 * content@举报原因列表展示，举报原因添加，举报原因删除
	*/
	app.controller("ReportReason" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){

		/* 获取举报原因列表 */
		$scope.list = [];	
		$rootScope.ajax( "/reason/list" , {} , function(data){			
			if(data.c == 0 && data.d.list.length){
				$scope.list = data.d.list;
			}
		});

		//删除单条数据
		$scope.delet = function( item , index ){
			if(!confirm("确定删除这条举报原因")){
				return false;
			}			
			$rootScope.ajax("/reason/delete/"+item.id , {} , function(data){
				if(data.c == 0){
					$scope.list.splice(index , 1);
				}else{
					alert("删除失败，稍后重试");
				}
			});
		}

		//打开原因添加模态框
		var report_add_modal = $("#report_add_modal");
		$scope.showAdd = function(){
			report_add_modal.modal("show");
		}
		$scope.addreason = {};
		$scope.save = function(){
			if(!$scope.addreason.content.trim()){
				alert("举报原因不能为空");
				return false;
			}			
			$rootScope.ajax("/reason/add" , $scope.addreason , function(data){
				console.log(data);
				if(data.c == 0){
					//需要返回id
					$scope.list.push({ "reason" :  $scope.addreason.content });
					$scope.addreason.content = "";
					report_add_modal.modal("hide");
				}else{
					alert("添加举报原因出错，请稍后重试");
				}
			});
		}
	}]);


	/* 举报列表部分 */

	/**
	 * content@话题举报，依据用户展示已审核，未审核列表；对某个用户的详情查看列表；对该用户下面谋篇话题的详情查看，操作。
	*/
	app.controller("ReportList" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		//每页15条记录
		$rootScope.EveryPage = 15;
		$rootScope.countGet = 0;
		//未审核，已审核状态记录
		var status;

		$scope.NotAudit = false;
		$scope.YesAudit = false;

		$scope.showNotAudit = function(){
			$scope.NotAudit = true;
			$scope.YesAudit = false;
			status = 0;
			$scope.getTopicReport(0 , true);	
		}

		$rootScope.Show_Not_Audit = $scope.showNotAudit;

		$scope.showYesAudit = function(){
			$scope.NotAudit = false;
			$scope.YesAudit = true;	
			status = 1;
			$scope.getTopicReport(0 , true);	
		}

		$scope.List = [];

		/**
		 * page , 请求页码; status , 0 未审核 , 1 已审核 ; Boolearn 列表是否切换
		*/
		$scope.getTopicReport = function( page , Boolearn ){
			$scope.List = [];
			$rootScope.ajax("/report/list" , { "type" : $rootScope.Type , "status" : status , "page" : page , "pagesize" : $rootScope.EveryPage } , function(data){
				console.log(data);
				$scope.List = data.d.list;
				if(Boolearn){
					$rootScope.countGet = data.d.count;
				}
			});
		}

		//举报内容打开、关闭
		$scope.ContentShowFn = function(item){
			if(item.contentshow){
				item.contentshow = false;
			}else{
				item.contentshow = true;
			}
		}

		//举报内容详情打开、关闭
		$scope.ContentDetailShow = function(item){
			if(item.contentDetail){
				item.contentDetail = false;
			}else{
				item.contentDetail = true;
			}

			//判断是否获取给条记录详情数据
			if(item.getData){
				return false;
			}

			$rootScope.ajax("/report/detail" , { "type" : $rootScope.Type , "userid" : item.reported_userid , "reportedid" : item.id , "status" : status } , function(data){
				console.log(data);
				item.arrDetail = data.d;
				item.getData = true;
			});
		}

		//对举报内容进行操作
		$scope.D_operate = function( arr , index , item , result ){
			$rootScope.ajax("/report/handle" , { "type" : $rootScope.Type , "reportedid" : item.id , "result" : result } , function(data){
				console.log(data);
				if(data.c == 0){
					alert("处理成功");
					arr.splice(index , 1);
				}else{
					alert("处理失败");
				}
			});
		} 

		//对举报话题详情查看
		$scope.goTopicDetail = function( item ){

			if($rootScope.Type == "comment"){
				return false;
			}
			switch(item.type){
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
			}
		}
		
	}]);

	
	//启动angular
	angular.bootstrap(document,['Report']);
});