/*
	分页模块
	说明 ： paging指令开辟自己的独立作用域。
			loader传递分页加载数据回调函数，写在所在控制中，
			nowpage , 回调函数固定型参，调用回调时传递指令内部变量scope.nowpage，即加载页码，
			everynum , 每页展示多少条数据，
			ng-count , 总共多少条数据 ,计算总页数, 指令内部会检测该值 , 发生改变时重置scope.nowpage == 1,

	使用例子，
			<paging loader="getMsg(nowpage)" ng-show="sendList.length" everynum="{{EveryPage}}" ng-count="{{countSend}}"></paging>
*/
define(['angular'] , function(angular){

	var app = angular.module("ngPage" , []);

	app.directive("paging" , function(){
		return {
			restrict : "AE",
			scope    : {
				loader : "&",
				ngCount: "@",
				everynum: "@"
			},	
			templateUrl : '/static/js/tpls/ngPaging.html',
			link : function( scope , element , attrs ){
				scope.nowpage = 1;

				//后退一页
				scope.prev = function(){
					if(scope.nowpage <= 1){
						return false;
					}
					--scope.nowpage;
					scope.loader({"nowpage" : scope.nowpage});  //设定loader接收表达式固定型参nowpage
					scope.pageNumber = "";
				}

				//前进一页
				scope.next = function(){
					if(scope.nowpage >= scope.pages){
						return false;
					}
					++scope.nowpage;
					scope.loader({"nowpage" : scope.nowpage});
					scope.pageNumber = "";
				}

				//选定一页查询
				scope.pageGo = function(){
					var num = scope.pageNumber;
					if(num / 1 && num >= 1 && num <= scope.pages){
						scope.nowpage = num;
						scope.loader({"nowpage" : scope.nowpage});
					}else{
						scope.pageNumber = "";
					}
				}

				//请求接口的改变将触发count重写(这里由外部逻辑控制) , BUG, 两次一样就没辙了
				scope.$watch("ngCount" , function(newValue){
					if(newValue){
						scope.pages = Math.ceil(scope.ngCount / scope.everynum); //计算有多少可展示页数
						scope.nowpage = 1;
						scope.pageNumber = "";
					}
				});						
			}
		}
	});	
});