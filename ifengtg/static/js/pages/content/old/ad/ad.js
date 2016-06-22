/*
	功能 : 广告发布添加 ，编辑
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use' , 'DateTimePicker' , 'APP/topic/setCoverPlan' , 'APP/topic/add_tags' , 'wangEditor' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Tab , Common , DateTimePicker , setCoverPlan , AddTag , wangEditor ){

	//封面图设置
	var coverImg;
	
	var init = function(){		
		addTopicFn();        //添加，编辑保存事件绑定
		// getAuthorList ();    //获取发布作者信息

		$("#adTimePick").datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			autoclose : true,
			language : 'zh-CN'
		});	

		/* =======  页面流程类型判断  ======= */
		
		if(Global.type == "editor"){
			//编辑、查看 逻辑		
			editorTopicInit();

			//广告信息修改初始化
			var editorAdsObj = new EditorAdsInfo();
		}else if(Global.type == "add"){
			//添加逻辑
			addTopicInit();
		}



		/*  封面图设置  */
		coverImg = new setCoverPlan($(".u_topic_text"));
	}


	var Global = {
		"type":true,          //依据url判断编辑逻辑还是添加逻辑
		"AllImgData" : [],   //保存所有图片数据
		"failImg"   : [],   //图片上传成功，但是处理失败，提示用户重新上传
		"ext_title" : "",   //记录最开始的标题, 向后台传递修改前的标题做历史标题
		"theid"     : 0,    //若是编辑状态，保存id.
	};
	Global.type = Common.dealurl("type" , "?");

	/* 正则处理 */
	var imgReg = /<img[^>]+>/g,
		htmlReg = /<[^>]*>/g,
		idReg = /(#](.*?)#])/g,
		strReg = /#]/g,
		brReg = /#br#/g,
		nReg  = /\n/g;


	/* 表单元素获取 */
	var topicForm = $("#topicForm");
	var	FormElements = {
		"title"       : topicForm.find('input[name="title"]'),
		"ext_title"   : topicForm.find('input[name="ext_title"]'),
		"publishtime" : topicForm.find('input[name="publishtime"]'),
		"nick"        : topicForm.find('input[name="nick"]'),
		"praise_count": topicForm.find('input[name="praise_count"]'),
		"comment_count": topicForm.find('input[name="comment_count"]'),
		"content"     : topicForm.find('#topicText'),
		"save"        : topicForm.find('#save'),
		// "editer"      : topicForm.find("#editer"),     //编辑选择select
		// "offical"     : topicForm.find("#offical")     //官方用户选择select
		"editorAds"  : topicForm.find("#editorAds"),   //广告编辑按钮
		"AdModal"    : $("#AdModal"),                  //广告编辑模态框
 	};

	/* 编辑流程 ，获取话题详情 */
	function getTopicData (callback){
		var id = Common.dealurl("id" , "?");
		Common.ajax({
			"url" : window.IP + "/topic/GetTopicData",
			"data" : {
				"id" : id
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
		if(obj.ext_title){
			FormElements.ext_title.val(obj.ext_title);
		}else{
			FormElements.ext_title.parent().hide();
		}
		Global.ext_title = obj.title;
		FormElements.publishtime.val((obj.publishtime+"").datechange());

		// FormElements.editer.val(obj.user_id).attr("disabled" , true);
		FormElements.nick.val(obj.nick);


		FormElements.praise_count.val(obj.praise_count);
		FormElements.comment_count.val(obj.comment_count);

		try{
			obj.pictures = JSON.parse(obj.pictures);
			Global.AllImgData = obj.pictures.concat();
		}catch(e){
			obj.pictures = [];
		}		
			
		var str = Common.dealTopicContent(obj.content , obj.pictures);
		str = str.replace(brReg , "<br>#br#");
		var divE = $('<div>' + str + '</div>');
		editorE.append(divE);

		if(obj.cover_pic){
			setTimeout(function(){
				//设置封面图
				coverImg.setCover(obj.cover_pic);			
			} , 1000);
		}		
	}

	/* 对图片排序 ，返回正确顺序的数组 ; 去除富文本编辑框中的html标签*/
	function sortImgArr (str , arr){
		var rids = str.match(idReg),
			newArr = [];
		if(rids == null){
			rids = [];
		}
		for(var m=0,len0=rids.length;m<len0;m++){
			rids[m] = rids[m].replace(strReg , "");
		}	
		for(var i=0,len=rids.length;i<len;i++){
			for(var j=0,len2=arr.length;j<len2;j++){
				var objs;
				try{
					objs = JSON.parse(arr[j]);
				}catch(e){
					objs = arr[j];
				}
				if(rids[i] == objs.rid){
					newArr.push(objs);
					break;
				}
			}
		}
		str = str.replace(imgReg , "[)#](");
		// str = str.replace(brReg  , "\n");
		str = str.replace(htmlReg , "");
		Global.AllImgData = newArr;
		return {
			"content" : str,
			"pictures" : newArr
		}
	}



	/* 编辑流程， 点赞数评论数修改 */
	function topicCount (){
		$(".JS_topic_count").click(function(event){
			event.preventDefault();
			var inputE = $(this).prev();
			if(inputE.val() < 0){
				alert("不能小于0");
				return false;
			}

			var types = inputE.attr("data-type");

			Common.ajax({
				"url" : "/count/TopicCountSet",
				"data" : {	
					"id" : Common.dealurl("id" , "?"),
					"n"  : types,
					"num": inputE.val()
				},
				success : function(data){
					if(data.c != 0 || data.d != 1){
						alert('修改失败');
						return false;
					}
					if(types == "Praise"){
						alert("点赞数修改成功");
					}else if(types == "Comment"){
						alert("评论数修改成功");
					}
				}
			})
		});
	}

	//取消发布作者选择
	/* 获取发布作者选择列表数据 */
	/*function getAuthorList (){
		var select = FormElements.editer;
		Common.ajax({
			"url" : "/user/GetUserList?type=editer",
			"data" : {},
			success : function(data){
				if(data.c != 0){
					alert('编辑用户列表获取失败');
					return false;
				}else{
					for(var i=0,len=data.d.list.length;i<len;i++){
						var obj = data.d.list[i];
						$('<option value="'+obj.id+'">'+obj.nick+'</option>').appendTo(select);
					}
				}
			}
		});
	}*/

	/* 广告信息发布控制 */
	function EditorAdsInfo (){
		var _this = this;
		this.openModal = FormElements.editorAds;
		this.box       = $("#adInfo");
		this.startE    = this.box.find('input[name="start"]');
		this.stepE     = this.box.find('input[name="step"]');
		this.num       = this.box.find('input[name="num"]');
		this.weight    = this.box.find('input[name="weight"]');
		if(Global.theid){
			this.id = Global.theid;
		}else{
			alert("添加状态下无id ，无法修改广告信息");
			return false;
		}
		this.endtime = this.box.find('input[name="endtime"]');

		/* 打开模态框 */
		this.openModal.click(function(event){
			event.preventDefault();
			FormElements.AdModal.modal("show");
		});

		/* 点击保存 */
		this.box.find("#saveAD").click(function(event){
			event.preventDefault();
			_this.sendData(_this.id);
		});

		/* 编辑打开时写入数据 */
		this.getData(_this.id , this.writeData , _this);
	}

	EditorAdsInfo.prototype.returnData = function() {
		var startE = this.startE.val().trim();
		if(startE < 1){
			alert('广告开始位置不对');
			return false;
		}
		var stepE = this.stepE.val().trim();
		if(stepE < 1){
			alert('步进长度不对');
			return false;
		}
		var enterTime = new Date(this.endtime.val());

		return {
			"start" : startE,
			"step"  : stepE,
			"num"   : this.num.val(),
			"weight": this.weight.val(),
			"endtime": enterTime.getTime().toString().substr(0,10)
		}
	};

	EditorAdsInfo.prototype.getData = function(id , callback , obj) {
		var _this = this;
		Common.ajax({
			"url" : window.IP + "/ad/GetAdData",
			"data" : {
				"id" : id
			},
			success : function(data){
				// console.log(data);
				return callback && callback(data.d , obj);
			}
		});
	};

	EditorAdsInfo.prototype.writeData = function(obj , father) {
		// console.log(obj);
		father.startE.val(obj.start);
		father.stepE.val(obj.step);
		father.num.val(obj.num);
		father.weight.val(obj.weight);
		father.endtime.val(obj.endtime);
	};

	EditorAdsInfo.prototype.sendData = function(id) {
		var data = this.returnData(),
			g = {
				"id" : id				
			};
		if(!data){	
			return false;
		}

		data = $.extend(data , g);
		Common.ajax({
			"url" : window.IP + "/ad/AdEdit",
			"data" : data,
			success : function(data){
				if(data.c == 0){
					alert(data.d.ret);
				}else{
					alert('请求失败');
				}
			}
		});
	};



	

	/* 编辑话题，页面逻辑设置 */
	function editorTopicInit(){
		/* 添加话题 */
		$("#addTopic").click(function(){
			window.location.href = "/index/ad?type=add";
		});
		getTopicData(writeInData);	

		topicCount();        //评论数 ，点赞数修改	
		Global.theid = Common.dealurl( "id" , "?" ); //保存id值
	}

	/* 添加话题，页面设置逻辑 */
	function addTopicInit(){
		$("#addTopic").hide();
		FormElements.publishtime.parent().hide();
		FormElements.ext_title.parent().hide();
		FormElements.nick.parent().hide();
		FormElements.praise_count.parent().hide();
		FormElements.comment_count.parent().hide();
		FormElements.editorAds.parent().hide();
	}

	/* 保存一个话题 ， 添加或者编辑 */
	function addTopicFn(){
		FormElements.save.click(function(event){
			var _this = this;
			event.preventDefault();
			var titleE = FormElements.title.val().trim(),
				contentE = FormElements.content.val().trim(),
				userID;
			var sendData = {		
					"pictures":"",
					"recommend" : 2,         //默认到首页
					"is_topic" : 2           //区分广告与普通话题
				};
			if(!titleE){
				alert('请填写标题');
				return false;
			}
			if(Global.type == "add"){
				// if(FormElements.recommend.val() == 2){
					userID  = FormElements.editer.val().trim();
				// }else{
				// 	userID  = FormElements.offical.val().trim();
				// }
				if(userID == "0"){
					alert('请选择一个发布者');
					return false;
				}
				sendData.user_id = userID;
			}
			if(!contentE){
				alert('请输入内容');
				return false;
			}
			contentE = sortImgArr( contentE , Global.AllImgData );  //返回一个携带
			sendData.content = contentE.content;
			sendData.pictures = JSON.stringify(contentE.pictures);
			sendData.content = Common.escape2Html(sendData.content);
			sendData.title = titleE;

			//对图片进行重新排序后，检查是否还有图片
			if(!Global.AllImgData.length){
				alert("请上传图片");
				return false;
			}

			if(Global.type == "editor"){
				sendData.id = Common.dealurl("id" , "?");
				sendData.ext_title = Global.ext_title;
			}	

			//获取封面图
			var coverPlan = coverImg.getCover(Global.AllImgData);
			if(coverPlan){
				sendData.cover_pic = coverPlan;
			}else{
				sendData.cover_pic = "";			
			}	

			// console.log(sendData)		
			Common.ajax({
				"url" : window.IP + "/topic/TopicEdit",
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
							alert('广告修改成功');
						}else{
							alert('广告添加成功');
						}
						window.location.href = "/index/ad?type=editor&id="+data.d.topicid;
					}else{
						alert('数据发送失败！');
					}			
				}
			});
		});
	}




	/*$(".u_topic_text").delegate("img" , "mousemove" , function(event){
		console.log(event);
		console.log(this.offsetLeft)	
		$(this).css("border","2px solid green");	
	});*/


















	
	/*  ====================== wangEditor , plupload 插件使用 ============================= */

	//上传图片页面元素获取
	var $uploadContainer = $('#uploadContainer'),
		$fileList = $('#fileList'),
		$btnUpload = $('#btnUpload');	

	var editorE = FormElements.content.wangEditor({
		"uploadImgComponent": $uploadContainer, //移动上传图片元素至编辑器内
		"menuConfig" : [
			['insertImage' , 'fullScreen']
		]
	});

	//实例化一个上传对象
    var uploader = new plupload.Uploader({
        browse_button: 'btnBrowse',
        url: '/upload/pics', 
        flash_swf_url: '/static/js/libs/plupload/Moxie.swf',
        sliverlight_xap_url: '/static/js/libs/plupload/Moxie.xap',
        filters: {
            mime_types: [
              //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
              { title: "图片文件", extensions: "jpg,gif,png,bmp" },
            ],
            prevent_duplicates : true,
            // max_file_size : '400KB'     
        }
    });
    //存储多个图片的url地址
    var urls = [];
    //重要：定义 event 变量，会在下文（触发上传事件时）被赋值
    var event;
    //初始化
    uploader.init();
    //绑定文件添加到队列的事件
    uploader.bind('FilesAdded', function (uploader, files) {
            //显示添加进来的文件名
        $.each(files, function(key, value){
            var fileName = value.name,
                html = '<li>' + fileName + '</li>';
            $fileList.append(html);
        });       
    });
    //删除操作设置
    $fileList.delegate("li" , "dblclick" , function(){
		var names = $(this).html();
		uploader.removeFile(names);
		$(this).remove();
	});
    //单个文件上传之后
    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
            //从服务器返回图片url地址
        var url = responseObject.response;        
        try{
        	url = JSON.parse(url);
        }catch(e){
        }
        if(!url.w || !url.h){
        	Global.failImg.push(file.name);
        	return false;
        }
        //先将url地址存储来，待所有图片都上传完了，再统一处理
        urls.push(url);
        Global.AllImgData.push(url);
    });

    var progressE = new Common.progressfn($("#u_progress"));

    uploader.bind('UploadProgress' , function(uploader , file ){    	
    	progressE.move(uploader.total.loaded / uploader.total.size);
    });

        //全部文件上传时候
    uploader.bind('UploadComplete', function (uploader, files) {
        $.each(urls, function (key, value) {
            //重要：调用 editor.command 方法，把每一个图片的url，都插入到编辑器中
            //重要：此处的 event 即上文定义的 event 变量            
            try{
				value = JSON.parse(value);
            }catch(e){}
        	editorE.command(event, 'insertHTML', '<img data-id="#]'+value.rid+'#]" src="' + value.url + '"/>');      
        });
        //清空url数组
        urls = [];
        //清空显示列表
        $fileList.html('');
        progressE.reset();

        if(Global.failImg.length != 0){
        	var str = Global.failImg.join(",");
        	alert(str + '上传失败，请重新上传.');
        	Global.failImg = [];
        }
    });

    //上传事件
    $btnUpload.click(function(e){
        //重要：将事件参数 e 赋值给 上文定义的 event 变量
        event = e;
        uploader.start();
    });



	init();
});