/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/common_use' , 'DateTimePicker' , 'angular' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Common , DateTimePicker , angular ){

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
		"ext_content" : {},                  //保存视频的信息
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

	app.controller("form" , function($scope , $http , $rootScope){
		$scope.isEditor = !window.Global.isAdd;
		$scope.data = {};		
		// $scope.ext_content = {};
		if($scope.isEditor){
			//编辑状态下获取数据
			$http.post("/topic/GetTopicData" , null , {
				"params" : {
					"id" : window.ID
				}
			}).success(function(data){
				if(data.c != 0){
					alert("数据获取失败");
					return false;
				}
				try{
					data.d.cover_pic = JSON.parse(data.d.cover_pic);
				}catch(e){}
				data.d.ext_content = JSON.parse(data.d.ext_content);
				$scope.data = data.d;				
				//全局中保存封面图数据
				if($scope.data.cover_pic instanceof Array){
					Global.cover_pic = $scope.data.cover_pic.concat();
				}else{
					Global.cover_pic[0] = $scope.data.cover_pic;
				}
				
				document.getElementById('upload_cover_pic').children[0].src = Global.cover_pic[0].url;
				Global.ext_content = $scope.data.ext_content;
				document.getElementById('showVideo').children[0].src = $scope.data.ext_content.url;


				//临时保存标题
				$rootScope.lastTitle = $scope.data.title;

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
			$scope.data.liststyle = "3";
			$scope.data.openway = "3";
			$scope.data.recommend = "2";

			/*  获取小号列表  */		
			/*$http.post("/user/GetSubAccountList").success(function(data){				
				$scope.authorList = data.d;
			});*/	

			/* 获取所有编辑用户列表 */		
			$http.post("/user/GetUserList?type=editer").success(function(data){				
				$scope.authorList = data.d.list;
			});
		}

		$scope.save = function(){

			if(!$scope.data.user_id){
				alert("请选择发布者");
				return false;
			}

			if(!$scope.data.title){
				alert("请输入标题");
				return false;
			}

			
			$scope.data.ext_content = Global.ext_content;
			if(!$scope.data.ext_content.url){
				alert("没有上传视频");
				return false;
			}
			$scope.data.ext_content = JSON.stringify($scope.data.ext_content);
			$scope.data.contenttype = $("#contenttype").val();

			if(!Global.cover_pic.length){
				alert("没有封面图哦");
				return false;
			}
			$scope.data.cover_pic = Global.cover_pic;
			$scope.data.cover_pic = JSON.stringify($scope.data.cover_pic);


			//如果修改标题，将原标题保存至ext_title字段
			if($scope.data.title != $rootScope.lastTitle){
				$scope.data.ext_title = $rootScope.lastTitle;
			}

			$scope.data.publishtime = $("#publishtime").val();
			$http.post("/topic/TopicNewEdit" , null , {
				"params" : $scope.data
			}).success(function(data){
				if(data.c == 0){
					//保存成功，刷新进入编辑状态
					location.href = "/index/topicVideo?type=editor&id=" + data.d.topicid;
				}else{
					alert(data.d);
				}
			});
			/*Common.ajax({
				"url" : "/topic/TopicNewEdit",
				"data": $scope.data,
				success: function(data){
					console.log(data);
				}
			})*/
		}
	});

	//启动angular
	angular.bootstrap(document,['All']);

	function uploadFn (option){
		//实例化一个上传对象
	    var uploader = new plupload.Uploader({
	        browse_button: option.btn,
	        url: option.url, 
	        flash_swf_url: '/static/js/libs/plupload/Moxie.swf',
	        sliverlight_xap_url: '/static/js/libs/plupload/Moxie.xap',
	        filters: {
	            mime_types: option.mime_types,
	            prevent_duplicates : false, //允许选取重复文件
	        },
	        max_file_size : 512000000,
	        max_retries : 3,  //上传失败重试3次
	        multi_selection : option.more,  //不可多选文件
	        multipart_params : {
        		"watermark" : 2  //告诉后台封面图不加水印
        	}
	    });
	    //初始化
	    uploader.init();
	    //绑定文件添加到队列的事件
	    uploader.bind('FilesAdded', function (uploader, files) {
	    	uploader.start();
	    	window.LOADING.style.display = "block";       
	    });
	    //单个文件上传之后
	    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
	        //从服务器返回url地址
	        var data = responseObject.response;	        
	        data = JSON.parse(data);
			option.callback(data);
			window.LOADING.style.display = "none";
	    });
	    uploader.bind("Error" , function(uploader , errObject){
	    	alert(errObject.message);
	    });
	}

	var pictureUpload = new uploadFn({
		"btn" : "upload_cover_pic",
		"url" : '/upload/pics',
		"more": false,
		"mime_types" : [
         	{ title: "图片文件", extensions: "jpg,jpeg,gif,png,bmp" },
        ],
		callback : function(data){
			if(!data.w || !data.h){
				alert("上传失败，请重传");
				return false;
			}
			document.getElementById('upload_cover_pic').children[0].src = data.url;
			Global.cover_pic[0] = data;		
		}
	});

	var videoUpload = new uploadFn({
		"btn" : "upVideo",
		"url" : '/upload/video',
		"more": false,
		"mime_types" : [],
		callback : function(data){
			console.log(data);
			if(data.videoUrl){				
				Global.ext_content.url = data.videoUrl;
				Global.ext_content.rid = data.rid;
				Global.ext_content.length = data.length;
				document.getElementById('showVideo').children[0].src = data.videoUrl;
			}else{
				alert("上传失败，请重传");
			}			
		}
	}); 
});