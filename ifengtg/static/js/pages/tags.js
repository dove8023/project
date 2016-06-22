/*
	时尚后台话题标签管理
*/

require(['Bootstrap' , 'APP/common_use' , 'APP/tab_change' , 'angular' , 'libs/jquery.sortable'] , function(Bootstrap , Common , Tab , angular){	

	var init = function(){
		getData ();

		//tab切换设置
		Tab({
			"mainE" : $(".JS_tab_main"),
			"active_class" : "btn-info",
			"contentE" : $(".JS_tab_Content")
		});
	}

	var Doom = {
		"addTagBtn" : $("#addTagBtn"),
		"tagModal"  : $("#tagModal"),
		"tagModal2"  : $("#tagModal2"),
		"addInput"  : $("#addInput"),
		"addSend"   : $("#addSend"),
		"editorInput" : $("#editorInput"),
		"editorSend" : $("#editorSend"),
		"listTemplate" : document.getElementById('listTemplate'),
		"tagList"  : document.getElementById('tagList'),
		"count"    : $("#count")
	}

	Doom.addTagBtn.click(function(){
		Doom.tagModal.modal("show");
	});

	Doom.tagModal.on("show.bs.modal",function(){
		setTimeout(function(){
			Doom.addInput.focus();
		} , 600);		
	});

	/* 获取标签列表数据 */
	function getData (){
		Common.ajax({
			"url" : "/tag/list",
			"data": {},
			success : function(data){
				// console.log(data);
				showList(data.d.list);
				Doom.count.html(data.d.count);


				// $("#tagList").sortable();
			}
		});
	}
	

	/* =======生成标签列表 =========*/
	function showList ( arr ) {
		var str = "",
			tempStr = Doom.listTemplate.innerHTML;

		arr.forEach(function(obj){
			obj.ctime = obj.ctime.toString().datechange();
			str += tempStr.temp(obj);
		});
		Doom.tagList.innerHTML = str;
	}


	/* ========添加一个标签========= */
	Doom.addSend.click(function(){
		var val = Doom.addInput.val().trim();
		if(!val){
			Doom.addInput.focus();
			return false;
		}
		Common.ajax({
			"url" : "/tag/add",
			"data": {
				"name" : val
			},
			success : function(data){
				console.log(data);
				if(data.c == 0 && data.d.tagid){
					Doom.tagModal.modal("hide");
					Doom.addInput.val("");
					getData ();
				}
			}
		})
	});


	/* =================删除标签 ========*/
	$(Doom.tagList).delegate(".JS_tag_delete" , "click" , function(){
		if(!confirm("确定要删除该标签?")){
			return false;
		}
		var tr = $(this).parents("tr"),
			ids = tr.attr("id");

		Common.ajax({
			"url" : "/tag/Delete/"+ids,
			"data": {},
			success : function(data){
				console.log(data);
				if(data.c == 0){
					tr.remove();
					var str = Doom.count.html();
					Doom.count.html(--str);
				}
			}
		})
	});

	/* =========编辑标签 =============*/
	Doom.tagModal2.on("show.bs.modal",function(){
		setTimeout(function(){
			Doom.editorInput.focus();
		} , 600);		
	});
	Doom.editorSend.click(function(){
		var val = Doom.editorInput.val();
		if(val == ""){
			Doom.editorInput.focus();
			return false;
		}
		var ids = Doom.editorInput.attr("data-id");
		Common.ajax({
			"url" : "/tag/Edit/"+ids,
			"data": {				
				"name":val
			},
			success : function(data){
				console.log(data);
				if(data.c == 0){
					Doom.tagModal2.modal("hide");
					Doom.editorInput.val("");
					getData ();
				}else{
					alert("修改失败，请重试");
				}
			}
		});
	});
	$(Doom.tagList).delegate(".JS_tag_editor" , "click" , function(){

		Doom.tagModal2.modal("show");
		Doom.editorInput.val($(this).html()).attr("data-id" , $(this).parents("tr").attr("id"));	
	});


	var app = angular.module("TagManage" , []);

	app.controller("HotTags" , ['$scope', '$rootScope' , '$http' , '$timeout' , function($scope , $rootScope , $http , $timeout){

		$rootScope.ajax = function( url , params , callback ){
			$http.post(url , params , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: Common.transform
			}).success(function(data){
				return callback && callback(data);
			});
		};

		$scope.oneHour;
		$scope.lastDay = [];
		$scope.sevenDay= [];
		$scope.recommend=[];
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 1 ,
			"time" : 0
		} , function(data){
			$scope.oneHour = data.d;
		});
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 1 ,
			"time" : 1
		} , function(data){
			$scope.lastDay = data.d;			
		});
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 1 ,
			"time" : 2
		} , function(data){
			$scope.sevenDay = data.d;			
		});
		$rootScope.ajax( "/hot/GetHotRecommendData" , {
			"type" : 1
		} , function(data){
			console.log(data);
			$scope.recommend = data.d;			
		});

		$scope.saveTag = function(arr){
			$rootScope.ajax( "/hot/EditHotDataRecommendList" , {
				"type" : 1,
				"hot"  : arr
			} , function(data){
				if(data.d){
					alert("保存成功");
				}
			});
		}


		$timeout(function(){
			$( "#TagHour, #TagLastday, #TagSevenDay, #TagRecommend" ).sortable({
	    		connectWith: ".JS_tag"
	    	});
		} , 3000);
	}]);

	app.controller("HotSearch" , ['$scope', '$rootScope' , '$http' , '$timeout' , function($scope , $rootScope , $http , $timeout){

		$scope.oneHour;
		$scope.lastDay = [];
		$scope.sevenDay= [];
		$scope.recommend=[];
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 0 ,
			"time" : 0
		} , function(data){
			$scope.oneHour = data.d;
		});
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 0 ,
			"time" : 1
		} , function(data){
			$scope.lastDay = data.d;			
		});
		$rootScope.ajax( "/hot/GetHotData" , {
			"type" : 0 ,
			"time" : 2
		} , function(data){
			$scope.sevenDay = data.d;			
		});
		$rootScope.ajax( "/hot/GetHotRecommendData" , {
			"type" : 0
		} , function(data){
			console.log(data);
			$scope.recommend = data.d;			
		});

		$scope.saveTag = function(arr){
			$rootScope.ajax( "/hot/EditHotDataRecommendList" , {
				"type" : 0,
				"hot"  : arr
			} , function(data){
				if(data.d){
					alert("保存成功");
				}
			});
		}


		$timeout(function(){
			$( "#SearchHour, #SearchLastday, #SearchSevenDay, #SearchRecommend" ).sortable({
	    		connectWith: ".JS_tag"
	    	});
		} , 3000);
	}]);



	app.directive("saveTag" , function(){
		return {
			restrict : "EA",
			scope    : {
				"savego" : "&"
			},
			link     : function($scope , element , attrs){
				element.bind("click" , function(){
					var btns = $(this).next().find("button"),
						arr = [];
					for(var i=0,len=btns.length;i<len;i++){
						var str = btns.eq(i).attr("data-str");
						if(str){
							arr.push(str);
						}
					}
					$scope.savego({"arr" : arr});
				});
			}  
		}
	});


	//启动angular
	angular.bootstrap(document,['TagManage']);

	init();
});