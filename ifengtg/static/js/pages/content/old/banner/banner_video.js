/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use' , 'DatePicker' , 'APP/topic/add_tags' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Tab , Common , DatePicker , AddTag ){

	var Doom = {
		"pageType"   : $("#pageType"),

	};

	//标签处理	
	var TagObj = new AddTag( $("#addTags") , $("#tagModal") );

	var Global = {
		"type":true,
		"id"  : Common.dealurl("id" , "?"),
		"posterData" : null,    //记录图片数据
	};

	var topicForm = $("#topicForm");
	var	FormElements = {
		"title"       : topicForm.find('input[name="title"]'),
		"ctime" : topicForm.find('input[name="ctime"]'),
		"mtime"       : topicForm.find('input[name="mtime"]'),
		"nick"        : topicForm.find('input[name="nick"]'),
		"lengthE"	  : topicForm.find('input[name="length"]'),
		"save"        : topicForm.find('#save')
	};	

	/* 编辑流程 ，获取话题详情 */
	function getTopicData (callback){
		var id = Common.dealurl("id" , "?");
		Common.ajax({
			"url" : window.IP + "/banner/GetBannerData",
			"data" : {
				"id" : id,
				"sid": 1,
				"uid": 1,
			},
			success : function(data){
				console.log(data);
				return callback && callback(data.d);
			}
		});
	}

	/* 编辑流程，展示数据 */
	function writeInData (obj){
		FormElements.title.val(obj.title);		
		FormElements.nick.val(obj.nick);		
		if(obj.mtime == 0){
			FormElements.mtime.parent().hide();
		}else{
			FormElements.mtime.val((obj.mtime+"").datechange());
		}
		FormElements.ctime.val((obj.ctime+"").datechange());

		var tags = obj.tag.split(",");
		for(var m=0,len=tags.length;m<len;m++){
			TagObj.addNewTag(tags[m]);
		}

		try{
			obj.content = JSON.parse(obj.content);	
		}catch(e){
			alert("数据解析出错!");
			throw "数据解析错误";
		}
		var times = (obj.content.length+'').toTime();
		FormElements.lengthE.val(times);
		Global.posterData = obj.content.picUrl;
		VideoE.create(obj.content.videoUrl , obj.content.picUrl.url);
	}

	var VideoE = new VideoControl();	
	
	/* 生成video标签 */
	function VideoControl (){
		var _this = this;
		this.father = document.getElementById('showVideo');
		this.video  = $(this.father).find("video")[0];

		$(this.father).prev().click(function(){
			_this.remove();
		});
	}
	VideoControl.prototype.create = function(url , pic) {
		if(!url){
			return false;
		}
		this.remove();
		var videoE = document.createElement("video");
		this.video = videoE;
		videoE.controls = "controls";
		videoE.width = 500;
		videoE.height = 400;
		videoE.src = url;
		videoE.poster = pic;
		this.father.appendChild(videoE);
	};
	VideoControl.prototype.remove = function(){
		this.father.innerHTML = "";
	}
	VideoControl.prototype.changePoster = function(url){
		try{
			var e = $(VideoE.father).find("video")[0];
			e.poster = url;
			// e.currentTime = 0;
		}catch(e){
			alert("请先上传视频,再上传图片.");
		}	
	}	

	/* 保存一个话题 ， 添加或者编辑 */
	function addTopicFn(){
		FormElements.save.click(function(event){
			event.preventDefault();
			var _this = this;
			var titleE = FormElements.title.val().trim();
			var sendData = {			
					"type" : 2,
					"tag" : TagObj.getAllChoiceTag().join(","),
				};			
			if(!titleE){
				alert('请填写标题');
				return false;
			}			
			sendData.title = titleE;
			if(Global.type == "editor"){
				sendData.id = Global.id;
			}
			sendData.length = FormElements.lengthE.val().toSecond();
			sendData.video  = VideoE.video.src;
			sendData.pictures = Global.posterData;

			//话题类型添加 , 普通的 ，图文banner , 广告
			sendData.is_topic = 3;

			// console.log(sendData)		
			Common.ajax({
				"url" : window.IP + "/banner/BannerEdit",
				"data" : sendData,
				beforeSend : function(){
					_this.setAttribute("disabled" , "true");
				},
				complete : function(){
					_this.setAttribute("disabled" , "false");
				},
				success : function(data){
					console.log(data);
					if(data.c == 0){
						if(Global.type == "editor"){
							alert('修改成功');
						}else{
							alert('添加成功');
						}
						window.location.href = "/index/BannerVideo?type=editor&id="+data.d.bannerid;
					}else{
						alert('数据发送失败！');
					}			
				}
			});
		});
	}

	addTopicFn();

	/* 添加话题，页面设置逻辑 */
	function addTopicInit(){
		Doom.pageType.html("视频Banner添加");
		FormElements.nick.parent().hide();
		FormElements.mtime.parent().hide();
		FormElements.ctime.parent().hide();		
	}

	/* 编辑话题，页面逻辑设置 */
	function editorTopicInit(){
		Doom.pageType.html("视频Banner编辑");
		getTopicData(writeInData);
	}


/* =======  页面流程类型判断  ======= */

	Global.type = Common.dealurl("type" , "?");
	if(Global.type == "editor"){
		//编辑、查看 逻辑		
		editorTopicInit();
	}else if(Global.type == "add"){
		//添加逻辑
		addTopicInit();
	}

	/* 重新获取图片数据 */
	function reloadImgData ( rid ){
		Common.ajax({
			"url" : "/reupload",
			"data": {
				"rid" : rid
			},
			success : function(data){
				Global.posterData = data;
			}
		});
	}



/*   plupload 插件使用 , 完成视频、图片上传  */
	var progressE = new Common.progressfn( $("#u_progress") );
	/*
		{
			btn : 'id',  //文件选择按钮
			url : /upload/video?uid='+window.uid+'&sid='+window.sid,
			mime_type : { title: "图片文件", extensions: "jpg,gif,png,bmp" },
			callback : function(){}
		}
	*/
	function uploadFn (option){
		//实例化一个上传对象
	    var uploader = new plupload.Uploader({
	        browse_button: option.btn,
	        url: option.url, 
	        flash_swf_url: '/static/js/libs/plupload/Moxie.swf',
	        sliverlight_xap_url: '/static/js/libs/plupload/Moxie.xap',
	        filters: {
	            mime_types: [
	             	// option.mime_type
	            ],
	            prevent_duplicates : true,
	        },
	        max_retries : 3,  //上传失败重试3次
	        multi_selection : false,  //不可多选文件
	    });
	    //初始化
	    uploader.init();
	    //绑定文件添加到队列的事件
	    uploader.bind('FilesAdded', function (uploader, files) {
	    	uploader.start();	          
	    });
	    //单个文件上传之后
	    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
	        //从服务器返回url地址
	        var data = responseObject.response;	        
	        data = JSON.parse(data);	      
			option.callback(data);
			progressE.reset();
	    });
	    uploader.bind('UploadProgress' , function(uploader , file ){	
	    	progressE.move(uploader.total.loaded / uploader.total.size);
	    });
	}

	var videoUpload = new uploadFn({
		"btn" : "upVideo",
		"url" : '/upload/video',
		callback : function(data){
			if(data.videoUrl){
				VideoE.create(data.videoUrl , data.picUrl.url);
				Global.posterData = data.picUrl;
			}
			var times = (data.length+'').toTime();
			FormElements.lengthE.val(times)
		}
	});

	var pictureUpload = new uploadFn({
		"btn" : "upPicture",
		"url" : '/upload/pics',
		callback : function(data){
			Global.posterData = data;
			if(!data.w || !data.h){
				reloadImgData(data.rid);
			}
			VideoE.changePoster(data.url);
		}
	});


	/*window.onbeforeunload = function(){
		if(Global.type == "editor"){
			return '离开前请确认已保存修改';
		}else{
			return '离开前请确认已保存添加';
		}		
	}*/
});