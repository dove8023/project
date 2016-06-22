/**
 * 	content @ 话题富文本编辑器，上传图片设置
 *  time    @ 2016/3/8
*/
define(['jQuery' , "APP/common_use"] , function(jQuery , Common){

	/* 传入 添加标签按钮元素 ，模态框元素 */
	function AddTag ( addBtn , Model ) {
		var _this = this;
		this.addBtn = addBtn;
		this.tagBox = addBtn.parent();    //标签添加进入的盒子
		this.Model = Model;              //模态框父级
		this.saveBtn = Model.find("#saveTag"); //添加执行按钮
		this.tagList = Model.find("#u_tags_list"); //展示所有标签项父级列表

		this.currentTag = [];    //记录当前已显示的tag,以去重

		this.addBtn.click(function(event){
			event.preventDefault();
			_this.Model.modal("show");
		});

		_this.Model.on("hide.bs.modal" , function(){
			_this.inputChecks.each(function(index , item){
				item.checked = false;
			});
		});

		this.getTagData();  //生成tag列表
		this.delegate();    //绑定删除事件
		this.saveTag();     //绑定保存事件
	}

	AddTag.prototype.addNewTag = function(str){
		//重复或者后天出入空
		if(!this.checkRepeat(str) || str == ""){
			return false;
		}

		var btn = $('<div />',{ "class" : "btn" , "text" : str });		

		this.addBtn.before(btn);

		btn.after($('<span />',{ "text" : "x" }));
	}

	AddTag.prototype.checkRepeat = function(str){
		var arr = this.currentTag;
		for(var i=0,len=arr.length;i<len;i++){
			if(arr[i] == str){
				return false;
			}
		}

		this.currentTag.push(str);
		return true;
	}

	AddTag.prototype.delegate = function(){
		var _this = this;
		this.tagBox.delegate("span" , "click" , function(){
			var divE = $(this).prev(),
				str = divE.html();

			divE.remove();
			$(this).remove();

			var arr = _this.currentTag;
			for(var i=0,len=arr.length;i<len;i++){
				if(str == arr[i]){
					arr.splice(i,1);
					break;
				}
			}
		});
	}

	AddTag.prototype.getAllChoiceTag = function(){
		var box = this.tagBox.find("div"),
			arr = [];
		for(var i=0,len=box.length;i<len;i++){
			var str = box.eq(i).html();
			if(!str){
				continue;
			}
			arr.push(str);
		}

		return arr;
	}

	AddTag.prototype.getTagData = function(){
		var _this = this;
		Common.ajax({
			"url" : "/Tag/List",
			"data": {},
			success : function(data){
				var data = data.d.list,
						len = data.length;
					_this.tagList.html("");					
				for(var i=0;i<len;i++){
					$('<li class="checkbox"><label><input type="checkbox" /><span>'+data[i].name+'</span></label></li>').appendTo(_this.tagList);
				}
				_this.inputChecks = _this.tagList.find('input:checkbox');
			}
		});
	}

	AddTag.prototype.saveTag = function(){
		var _this = this;
		this.saveBtn.click(function(){
			var checks = _this.inputChecks,
				len = checks.length;
			for(var i=0;i<len;i++){
				if(checks[i].checked){
					_this.addNewTag( $(checks[i]).next().html() );
				}
			}

			_this.Model.modal("hide");
		})
	}


	return AddTag;
});