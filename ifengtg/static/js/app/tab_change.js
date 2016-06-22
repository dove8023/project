/*
	tab 切换模块
*/
define(['jQuery'] , function(jQuery){

/*
ul->li(data-number=0)

{
	main_callback : function(){} 菜单改变后回调执行
	content_callback : function(){} 内容展示切换后回调执行
	mainE         :  菜单元素组
	contentE      :  内容元素组
	active_class  :   菜单变化样式

}*/
	function Tab(option){
		option.mainE.click(function(){
			/* 菜单元素一定指定data-number="0" */
			var num = $(this).data("number") / 1;

			if(option.active_class){
				option.mainE.removeClass(option.active_class);
				$(this).addClass(option.active_class);
			}			

			option.contentE.hide().eq(num).show();

			if(option.main_callback){
				option.main_callback($(this));
			}
			return option.content_callback && option.content_callback(num);
		});
	}
	return Tab;
});