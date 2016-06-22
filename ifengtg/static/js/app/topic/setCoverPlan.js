/*
	设置富文本编辑框中某个图片为封面图
	备注：放弃了原业务逻辑，该脚本放弃 , 2016.2.16 , Mr.He
*/
define(['jQuery' , "APP/common_use"] , function(jQuery , Common){

	/* box 为父级元素 ，限定仅有1个封面图 */
	function setCoverPlan ( box ) {
		this.box = box;
		this.init();
	}

	setCoverPlan.prototype.init = function(){
		this.imgfn();
	}

	/* 图片双击事件添加 */
	setCoverPlan.prototype.imgfn = function(){
		var _this = this;
		_this.box.delegate("img" , "dblclick" , function(event){
			if($(this).hasClass("coverplan")){
				$(this).removeClass("coverplan");
			}else{
				_this.box.find("img").removeClass("coverplan");
				$(this).addClass("coverplan");
			}
		});
	}
	var imgReg = /#]/g;
	setCoverPlan.prototype.getCover = function(fatherarr){
		var img = this.box.find("img.coverplan"),
			arr = [];
		if(!img.length){
			return false;
		}
		var str = img.attr("data-id").replace(imgReg , "");
		var obj = fatherarr.findOne("rid" , str);
		arr.push(obj);
		return JSON.stringify(arr);
	}

	setCoverPlan.prototype.setCover = function(arr){
		try{
			arr = JSON.parse(arr);
		}catch(e){}
		for(var i=0;i<arr.length;i++){
			var rid = "#]" + arr[i].rid + "#]";
			this.box.find('img[data-id="'+rid+'"]').addClass("coverplan");
		}
	}



	return setCoverPlan;
});