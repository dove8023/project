/*
	分页模块
*/
define(['jQuery'] , function(jQuery){

/*
	传入一个空的ul.默认选中第1页。
*/
	
	function paging (ul , pages , callback){
		if(pages <= 1){
			ul.hide();
		}else{
			ul.show();
		}
		this.callbackfn = callback;
		this.current = 1;
		var _this = this;
		ul.html("");
		$('<li class="prev"><span aria-label="Previous"><span aria-hidden="true">«</span></span></li>').appendTo(ul);
		for(var i=1;i<=pages;i++){
			if(i == 1){
				$('<li class="active JS_page"><span>'+i+'</span></li>').appendTo(ul);
			}else{
				$('<li class="JS_page"><span>'+i+'</span></li>').appendTo(ul);
			}			
		}
		$('<li class="next JS_page"><span aria-label="Next"><span aria-hidden="true">»</span></span></li>').appendTo(ul);

		ul.attr("data-current", 1);

		ul.delegate("li" , "click" , function(){
			var that = $(this),current = ul.attr("data-current"),
				newCurrent;
			if(that.hasClass("active")){
				return false;
			}
			if(that.hasClass("prev")){
				if(current == 1){
					return false;
				}

				current--;
			}else if(that.hasClass("next")){
				if(current == pages){
					return false;
				}
				current++;
			}else{
				current = that.find("span").html() / 1;
			}			

			that.siblings().removeClass("active");
			
			ul.find("li").eq(current).addClass("active");

			ul.attr("data-current" , current);

			_this.current = current;

			return callback && callback(current-1);
		});
	}

	paging.prototype.refresh = function(){
	
		return this.callbackfn && this.callbackfn(this.current - 1);
	}

	return paging;
});