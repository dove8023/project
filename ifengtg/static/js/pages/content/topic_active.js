/**
 * content @ 活动添加编辑页面，业务逻辑同直播、普通页面基本保持一致
 * time    @ 2016/3/8
*/

require(['Bootstrap' , 'APP/common_use' , 'DateTimePicker' , 'angular' , 'APP/topic/topic_common2'] , function(Bootstrap , Common , DateTimePicker , angular){

	var transform = function(data){
		return $.param(data);
	}

	$(".JS_datetime").datetimepicker();
	var startTime = $("#startTime"),
		endTime   = $("#endTime");

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
		"AllImgData" : [],                   //保存所有上传图片
		"failImg"    : [],                   //保存上传失败的图片
		"AllTag"     : [],                   //保存所有tag数据
	};

	//图文混排处理
	var DealContent = new Common.DealPictureText();


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
		$scope.data.ext_content = {};
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
					data.d.pictures = JSON.parse(data.d.pictures);
				}catch(e){}

				$scope.data = data.d;
				//全局中保存封面图数据
				if($scope.data.cover_pic instanceof Array){
					Global.cover_pic = $scope.data.cover_pic.concat();
				}else{
					Global.cover_pic[0] = $scope.data.cover_pic;
				}
				if($scope.data.cover_pic){
					//有封面图时，展示封面图
					document.getElementById('upload_cover_pic').children[0].src = Global.cover_pic[0].url;
				}


				//全局对象中保存已有的图片数据
				Global.AllImgData = $scope.data.pictures.concat();
				DealContent.compound( $scope.data.content , $scope.data.pictures , function(str){
					var divE = $('<div>' + str + '</div>');
					editorE.append(divE);
				});

				if($scope.data.tag){
					$rootScope.showTags = $scope.data.tag.split(",");
				}

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


				try{
					$scope.data.ext_content = JSON.parse($scope.data.ext_content);
				}catch(e){}
				startTime.val($scope.data.ext_content.start.toString().datechange());
				endTime.val($scope.data.ext_content.end.toString().datechange());
			});
		}else{
			//添加状态默认值设置
			$scope.data.is_topic = "3";
			$scope.data.liststyle = "6";
			$scope.data.openway = "5";
			$scope.data.recommend = "3";
			$scope.data.ext_content.is_join = "0";
			/*  获取小号列表  */
			/*$http.post("/user/GetSubAccountList").success(function(data){
				$scope.authorList = data.d;
			});	*/

			/* 获取所有编辑用户列表 */
			$http.post("/user/GetUserList?type=editer").success(function(data){
				$scope.authorList = data.d.list;
			});
		}

		$scope.addTag = function(){
			$("#tagModal").modal("show");
		}

		$scope.tagDelete = function($index){
			$rootScope.showTags.splice($index , 1);
		}

		$scope.save = function(){

			//添加类型
			$scope.data.contenttype = $("#contenttype").val();
			// $scope.data.ext_content = "";  //话题提交为空

			var start = startTime.val();
			var end = endTime.val();
			if(!start){
				alert("请选择活动开始时间");
				return false;
			}
			if(!end){
				alert("请选择活动结束时间");
				return false;
			}
			$scope.data.ext_content.start = start.toTimestamp();
			$scope.data.ext_content.end   = end.toTimestamp();
			if($scope.data.ext_content.start >= $scope.data.ext_content.end){
				alert("结束时间必须大于开始时间");
				return false;
			}

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

			$scope.data.small_pic = "";


			$scope.data.cover_pic = Global.cover_pic;
			if(!Global.cover_pic.length){
				alert("没有封面图哦");
				return false;
			}

			var contentE = $("#topicText").val();
			if(!contentE){
				alert('请输入内容');
				return false;
			}
			console.log(contentE);

			contentE = DealContent.separate( contentE , Global.AllImgData );
			$scope.data.content = contentE.content;
			console.log($scope.data.content);
			if(!contentE.pictures.length){
				alert("内容中没有图片");
				return false;
			}

			$scope.data.pictures = JSON.stringify(contentE.pictures);

			if(!$scope.data.cover_pic){
				$scope.data.cover_pic = "";
			}else{
				$scope.data.cover_pic = JSON.stringify($scope.data.cover_pic);
			}


			if($rootScope.showTags){
				$scope.data.tag = $rootScope.showTags.join(",");
			}
			// console.log($scope.data);
			$scope.data.publishtime = $("#publishtime").val();


			//ext_content 转为字符串
			$scope.data.ext_content = JSON.stringify($scope.data.ext_content);


			$http.post("/topic/TopicNewEdit" , $scope.data , {
			    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			    transformRequest: transform
			}).success(function(data){
				if(data.c == 0){
					//保存成功，刷新进入编辑状态
					// return
					location.href = "/index/topicActive?type=editor&id=" + data.d.topicid;
				}else{
					alert(data.d);
				}
			});
		}
	});

	/* 点赞数评论数控制器 */
	app.controller("thumbComment" , function($scope , $http){
		$scope.changeThumb = function(){
			//点赞数修改提交
			topicCount( $scope.data.praise_count / 1, "Praise" , $http);
		}
		$scope.changeComment = function(){
			//评论数修改提交
			topicCount( $scope.data.comment_count / 1, "Comment" , $http);
		}
	});

	/* 标签管理 */
	app.controller("tag" , function($scope , $http , $rootScope){
		$http.post("/Tag/List" , null , {
			"params" : {}
		}).success(function(data){
			if(data.c != 0){
				alert("标签列表获取失败");
				return false;
			}
			$scope.tags = data.d.list;
		});

		$scope.saveTag = function(){
			var nowChoice = [];
			for(var i=0,len=$scope.tags.length;i<len;i++){
				if($scope.tags[i].ischoice){
					nowChoice.push($scope.tags[i].name);
				}
			}
			$rootScope.showTags = nowChoice;
			$("#tagModal").modal("hide");
		}
	});

	//启动angular
	angular.bootstrap(document,['All']);

	/* 点赞数 评论数修改 */
	function topicCount ( num , types , $http){
		if(!Number(num)){
			alert("请输入数字");
			return false;
		}
		if(num < 0){
			alert("请输入正整数");
		}
		$http.post("/count/TopicCountSet" , null , {
			"params" : {
				"id" : window.ID,
				"n"  : types,
				"num": num
			}
		}).success(function(data){
			if(data.c != 0 || data.d != 1){
				alert('修改失败');
				return false;
			}
			if(type == "Praise"){
				alert("点赞数修改成功");
			}else if(types == "Comment"){
				alert("评论数修改成功");
			}
		});
	}
});