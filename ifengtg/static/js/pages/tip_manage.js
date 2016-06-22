/**
 *	content @ app提示管理界面 数据交互
*/

require(['Bootstrap' , 'APP/common_use' , 'angular' , './pages/user/user_filter'] , function(Bootstrap , Common , angular , user_filter){

	var app = angular.module("TipManage" , ["UserFilter"]);
	var transform = Common.transform;

	app.controller("TipType" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){

		$rootScope.CurrentType = null; //当前选中项，包含列表请求ID.
		$rootScope.List        = [];   //   保存选中项所有列表元素
		$scope.tipTypeList = [];       // 类型列表

		$rootScope.ajax = function( url , params , callback ){
			$http.post(url , params , {
				headers : {  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				transformRequest: transform
			}).success(function(data){
				return callback && callback(data);
			});
		}


		$rootScope.ajax("/hint/HinttypeList" , {} , function(data){
			$scope.tipTypeList = data.d;

			//默认打开第一项
			$rootScope.tipTypeChange($scope.tipTypeList[0]);
		});		

		$rootScope.tipTypeChange = function(obj){
			//样式切换
			for(var i=0;i<$scope.tipTypeList.length;i++){
				$scope.tipTypeList[i].show = false;
			}
			obj.show = true;
			$rootScope.CurrentType = obj; //全局中保存当前类型项
			$rootScope.ajax("/hint/List" , { "type_id" : obj.id } , function(data){
				// console.log(data);
				$rootScope.List = data.d.list;
			});
		}
	}]);

	app.controller("TipList" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){
		var tipChangeE = $("#tipChange");
		//修改提示语
		$scope.changeData = {};
		$scope.changeContent = function(item){
			tipChangeE.modal("show");
			$scope.changeData = angular.copy(item);			
		}
		$scope.contentSave   = function(){			
			if($scope.changeData.default2 == true){
				$scope.changeData.default = 1;
			}else{
				$scope.changeData.default = 0;
			}
			$rootScope.ajax("/hint/Edit/"+$scope.changeData.id , {
				"content" : $scope.changeData.content,
				"default" : $scope.changeData.default,
				"type_id" : $rootScope.CurrentType.id
			} , function(data){
				//修改成功，重新刷新列表
				tipChangeE.modal("hide");
				$rootScope.tipTypeChange($rootScope.CurrentType);
			});
		}

		//设为默认提示语		
		$scope.setDefault = function(item){
			if(item.default == 1){
				return false;
			}
			if(!confirm("确定将它设置为默认提示")){
				return false;
			}
			$rootScope.ajax("/hint/SetDefault/"+item.id , { "type_id" : $rootScope.CurrentType.id } , function(data){
				$rootScope.tipTypeChange($rootScope.CurrentType);
			});
		}


		//添加提示语，类型依据$rootScope.CurrentType
		var addModal = $("#tipAdd");
		$scope.addData = {};
		$scope.addItem = function(){
			addModal.modal("show");
			$scope.addData = {};	
		}
		$scope.addSave = function(){
			$scope.addData.type_id = $rootScope.CurrentType.id;
			if($scope.addData.default2){
				$scope.addData.default = 1;
			}else{
				$scope.addData.default = 0;
			}
			if(!$scope.addData.content){
				alert("请输入提示内容");
				return false;
			}
			$rootScope.ajax("/hint/Add" , $scope.addData , function(data){
				//刷新列表
				addModal.modal("hide");
				$rootScope.tipTypeChange($rootScope.CurrentType);
			});
		}


		//删除提示语
		$scope.delet = function(index , item){			
			if(!confirm("确定删除该条记录?")){
				return false;
			}

			$rootScope.ajax("/hint/Delete/"+item.id , {} , function(data){
				$rootScope.List.splice(index , 1);
			});
		}

	}]);



	app.controller("Test" , ['$scope' , '$rootScope' , '$http' , function($scope , $rootScope , $http){


		/*var but = $("#test").find("button");
		$("#one").on("dragstart" , function(event){
			console.log(event.dataTransfer);
			event.dataTransfer.setData("Text" , event.target.id);
		}).on("dragover" , function(event){
			event.preventDefault();	
		}).on("drop" , function(event){
			event.preventDefault();
			var data = event.dataTransfer.getData("Text");
			event.target.appendChild(document.getElementById(data));
		});*/

		/*var oneE = document.getElementById('one');

		oneE.ondragstart = function(ev){
			console.log(ev.dataTransfer);
			console.log(ev.target.id)
			ev.dataTransfer.setData("Text" , ev.target.id);
		}*/


		$scope.hello = [{"name":"one"},{"name":"two"},{"name":"three"},{"name":"four"},{"name":"five"}];

		$scope.drag = function(ev , index){
			console.log(ev.dataTransfer);
			console.log(index)
			ev.dataTransfer.setData("Text" , ev.target.id);
		}
	}]);


	/*window.drag = function(ev , index){
		
	}*/

	window.allow = function(event){
		event.preventDefault();
	}

	window.drop = function(ev){
		console.log(ev.target.id);
		ev.preventDefault();
		var data=ev.dataTransfer.getData("Text");
		console.log(data);return;
		ev.target.appendChild(document.getElementById(data));
	}


	app.directive("dragDrop" , function(){
		return {
			restrict : "EA",
			/*scope    : {
				"drag-drop" : "&"
			},*/
			link     : function($scope , element , attrs){
				var beginIndex;  //保存拖拽开始时的位置
				element.bind("dragstart" , function(){
					console.log(attrs.dragDrop);
				}).bind("dragover" , function(event){
					event.preventDefault();
				}).bind("drop" , function(event){
					event.preventDefault();

				});

				
			}
		}
	});




	//启动angularJS
	angular.bootstrap(document , ["TipManage"]);

});