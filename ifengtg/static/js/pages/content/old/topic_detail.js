/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use' , 'DatePicker' , 'APP/topic/setCoverPlan' , 'APP/topic/add_tags' , 'wangEditor' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Tab , Common , DatePicker , setCoverPlan , AddTag , wangEditor ){

	var Doom = {
		"addTopic" : $("#addTopic"),
	};
	var Global = {
		"type":true,
		 "AllImgData" : [],  //保存所有图片数据
		 "failImg"   : [],   //图片上传成功，但是处理失败，需重新上传
		 "ext_title" : "",   //标题修改后，记录最开始的标题
	};

	var topicForm = $("#topicForm");
	var	FormElements = {
		"title"       : topicForm.find('input[name="title"]'),
		"ext_title"   : topicForm.find('input[name="ext_title"]'),
		"publishtime" : topicForm.find('input[name="publishtime"]'),
		"nick"        : topicForm.find('input[name="nick"]'),
		"praise_count": topicForm.find('input[name="praise_count"]'),
		"comment_count": topicForm.find('input[name="comment_count"]'),
		"tagBox"      : topicForm.find('.JS_tagBox'),
		"recommend"   : topicForm.find('#recommend'),
		"content"     : topicForm.find('#topicText'),
		"save"        : topicForm.find('#save'),
		// "editer"      : topicForm.find("#editer"),     //编辑选择select
		// "offical"     : topicForm.find("#offical")     //官方用户选择select
	};


	//标签处理	
	var TagObj = new AddTag( $("#addTags") , $("#tagModal") );

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

		FormElements.nick.val(obj.nick);
		FormElements.praise_count.val(obj.praise_count);
		FormElements.comment_count.val(obj.comment_count);
		FormElements.recommend.val(obj.recommend).attr("disabled" ,true);

		try{
			obj.pictures = JSON.parse(obj.pictures);
			Global.AllImgData = obj.pictures.concat();
		}catch(e){
			obj.pictures = [];
		}

		var tags = obj.tag.split(",");
		for(var m=0,len=tags.length;m<len;m++){
			TagObj.addNewTag(tags[m]);
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




	var imgReg = /<img[^>]+>/g,
		htmlReg = /<[^>]*>/g,
		idReg = /(#](.*?)#])/g,
		strReg = /#]/g,
		brReg = /#br#/g,
		nReg  = /\n/g;

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
	

	/* 保存一个话题 ， 添加或者编辑 */
	function addTopicFn(){
		FormElements.save.click(function(event){
			event.preventDefault();
			var _this = this;
			var titleE = FormElements.title.val().trim(),
				contentE = FormElements.content.val().trim(),
				userID;
			var sendData = {								
					"pictures":"",
					"tag" : TagObj.getAllChoiceTag().join(","),
					"recommend" : FormElements.recommend.val()
				};
			if(!titleE){
				alert('请填写标题');
				return false;
			}

			//去掉发布作者选择，只能是自己
			/*if(Global.type == "add"){
				if(FormElements.recommend.val() == 2){
					userID  = FormElements.editer.val().trim();
				}else{
					userID  = FormElements.offical.val().trim();
				}
				if(userID == "0"){
					alert('请选择一个发布者');
					return false;
				}
				sendData.user_id = userID;
			}*/
			if(!contentE){
				alert('请输入内容');
				return false;
			}

			contentE = sortImgArr( contentE , Global.AllImgData );
			sendData.content = contentE.content;
			sendData.pictures = JSON.stringify(contentE.pictures);
			sendData.content = Common.escape2Html(sendData.content);
			sendData.title = titleE;

			//对图片进行重新排序后，检查是否还有图片
			if(!Global.AllImgData.length){
				alert("请上传图片");
				return false;
			}

			//话题类型添加 , 普通的 ，图文banner , 广告
			sendData.is_topic = 1;


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
							alert('修改成功');
						}else{
							alert('添加成功');
						}
						window.location.href = "/index/topicdetail?type=editor&id="+data.d.topicid;
					}else{
						alert('数据发送失败！');
					}			
				}
			});
		});
	}

	addTopicFn();

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

	topicCount();


	/* 获取发布作者选择列表数据 */
	// function getAuthorList (){
	// 	var select = FormElements.editer;
	// 	Common.ajax({
	// 		"url" : "/user/GetUserList?type=editer",
	// 		"data" : {},
	// 		success : function(data){
	// 			if(data.c != 0){
	// 				alert('编辑用户列表获取失败');
	// 				return false;
	// 			}else{
	// 				for(var i=0,len=data.d.list.length;i<len;i++){
	// 					var obj = data.d.list[i];
	// 					$('<option value="'+obj.id+'">'+obj.nick+'</option>').appendTo(select);
	// 				}
	// 			}
	// 		}
	// 	});
	// }
	
	/* 获取发布作者选择列表数据 */
	// function getOfficalList (){
	// 	var select = FormElements.offical;
	// 	Common.ajax({
	// 		"url" : "/user/GetUserList?type=official",
	// 		"data" : {},
	// 		success : function(data){
	// 			if(data.c != 0){
	// 				alert('编辑用户列表获取失败');
	// 				return false;
	// 			}else{
	// 				for(var i=0,len=data.d.list.length;i<len;i++){
	// 					var obj = data.d.list[i];
	// 					$('<option value="'+obj.id+'">'+obj.nick+'</option>').appendTo(select);
	// 				}
	// 			}
	// 		}
	// 	});
	// }
	




	/* 添加话题，页面设置逻辑 */
	function addTopicInit(){
		Doom.addTopic.hide();
		FormElements.publishtime.parent().hide();
		FormElements.ext_title.parent().hide();
		FormElements.nick.parent().hide();
		FormElements.praise_count.parent().hide();
		FormElements.comment_count.parent().hide();
		// FormElements.editer.show();

		//获取两种发布者列表
		// getAuthorList ();
		// getOfficalList ();
		// //依据发布的位置(广场页或者首页) 切换发布者
		// FormElements.recommend.on("change" , function(){
		// 	if($(this).val() == 2){
		// 		FormElements.editer.show();
		// 		FormElements.offical.hide();
		// 	}else{
		// 		FormElements.editer.hide();
		// 		FormElements.offical.show();
		// 	}
		// })
	}

	/* 编辑话题，页面逻辑设置 */
	function editorTopicInit(){
		/* 添加话题 */
		Doom.addTopic.click(function(){
			window.location.href = "/index/topicdetail?type=add";
		});
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

    /* 重新获取图片数据 */
	/*function reloadImg (){
		if(!Global.failImg[0]){
			return false;
		}
		Common.ajax({
			"url" : "/reupload",
			"data": {
				"rid" : Global.failImg[0].rid
			},
			success : function(data){
				Global.AllImgData.push(data);
				Global.failImg.splice(0,1);
				reloadImg ();
			}
		});
	}*/

	/*  ====================== wangEditor , plupload 插件使用 END ============================= */



	/*  封面图对象创建  */
	var coverImg = new setCoverPlan($(".u_topic_text"));

	/* 
		添加位置控制 ，shizhuang_isediter = 1 为编辑 ，可添加至首页、广场页；其它只能是广场页；
		编辑状态不具备修改位置功能
	 */
	function AddLocation () {
		//select 元素
		var selectE = FormElements.recommend;
		//获取cookie
		var shizhuang_isediter = Common.ReadCookie("shizhuang_isediter");
		if(Global.type == "editor"){
			selectE.attr("disabled" , true);
		}else if(Global.type == "add"){
			if(shizhuang_isediter == 1){
				selectE.attr("disabled" , false);
			}else{
				selectE.attr("disabled" , true).val(0);
			}
		}
	}

	AddLocation ();
});