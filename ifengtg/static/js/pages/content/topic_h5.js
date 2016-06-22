/**
 * content @ 内容管理，h5添加界面
*/

require(['Bootstrap' , 'APP/common_use' , 'DateTimePicker' , 'angular'] , function(Bootstrap , Common , DateTimePicker , angular ){

	var transform = function(data){
		return $.param(data);
	}

	$("#publishtime").datetimepicker();

	window.Global = {
		"isAdd" : (function(){
			//根据url获取页面类型，add 为true , editor false
			var id = Common.dealurl("id" , "?");
			if(id){
				window.ID = id;
				return false; 
			}else{
				return true;
			} 
		})(),
		"cover_pic" : [],                    //保存封面图片数据
	};


	var app = angular.module("All" , []);
	app.filter("toTime" , function(){
		var toTimeFn = function(input){
			return input && input.toString().datechange();
		};
		return toTimeFn;
	});
	app.filter("toNumber" , function(){
		var toNumberFn = function(input){
			if(input !== undefined){
				return input*1;
			}			
		};
		return toNumberFn;
	});

	app.controller("form" , function($scope , $http ,$rootScope){
		$scope.isEditor = !window.Global.isAdd;
		$scope.data = {};

		if($scope.isEditor){
			//编辑状态下获取数据
			$http.post("/topic/GetTopicData" , null , {
				"params" : {
					"id" : window.ID
				}
			}).success(function(data){
				console.log(data);
				if(data.c != 0){
					alert("数据获取失败");
					return false;
				}
				try{
					data.d.cover_pic = JSON.parse(data.d.cover_pic);
				}catch(e){}
				try{
					data.d.ext_content = JSON.parse(data.d.ext_content);
				}catch(e){}
				
				$scope.data = data.d;
				//临时保存标题
				$rootScope.lastTitle = $scope.data.title;

				//全局中保存封面图数据
				if($scope.data.cover_pic instanceof Array){
					Global.cover_pic = $scope.data.cover_pic.concat();
				}else{		
					Global.cover_pic[0] = $scope.data.cover_pic;
				}
				document.getElementById('upload_cover_pic').children[0].src = Global.cover_pic[0].url;

				//发布时间是否可选
				if($scope.data.is_publish == "1"){
					//已经上线了，不可改
					$scope.data.gone_publish = true;
				}else{
					//未上线，可改
					$scope.data.gone_publish = false;
				}

				//时间字符串处理
				$scope.data.publishtime = $scope.data.publishtime.toString().datechange();
			});
		}else{
			//添加状态默认值设置
			$scope.data.is_topic = "1";
			$scope.data.liststyle = "2";
			$scope.data.openway = "5";
			$scope.data.recommend = "2";

			/*  获取小号列表  */		
			/*$http.post("/user/GetSubAccountList").success(function(data){				
				$scope.authorList = data.d;
			});	*/

			/* 获取所有编辑用户列表 */
			$http.post("/user/GetUserList?type=editer").success(function(data){				
				$scope.authorList = data.d.list;
			});
		}

		$scope.save = function(){
			$scope.data.contenttype = $("#contenttype").val();

			if(!$scope.data.user_id){
				alert("请选择发布者");
				return false;
			}

			if(!$scope.data.title){
				alert("请输入标题");
				return false;
			}
			//如果修改标题，将原标题保存至ext_title字段
			if($scope.data.title != $rootScope.lastTitle){
				$scope.data.ext_title = $rootScope.lastTitle;
			}
			// console.log($scope.data);
			if(!Global.cover_pic.length){
				alert("没有封面图哦");
				return false;
			}
			if(!$scope.data.ext_content.url){
				alert("没有H5链接");
				return false;
			}
			$scope.data.ext_content = JSON.stringify($scope.data.ext_content);
			$scope.data.cover_pic = Global.cover_pic;
			$scope.data.cover_pic = JSON.stringify($scope.data.cover_pic);
			
			$scope.data.publishtime = $("#publishtime").val();
			$http.post("/topic/TopicNewEdit" , null , {
				"params" : $scope.data
			}).success(function(data){
				if(data.c == 0){
					//保存成功，刷新进入编辑状态
					location.href = "/index/topicH5?type=editor&id=" + data.d.topicid;
				}else{
					alert(data.d);
				}
			});			
		}
	});

	

//启动angular
	angular.bootstrap(document,['All']);

	/* 封面图上传设置 */
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
			Global.cover_pic[0] = data;			
		}
	});
});