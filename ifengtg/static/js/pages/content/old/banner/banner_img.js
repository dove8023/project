/*
	时尚后台账户管理js 脚本
*/

require(['Bootstrap' , 'APP/tab_change' , 'APP/common_use' , 'DatePicker' , 'APP/topic/setCoverPlan' , 'APP/topic/add_tags' , 'wangEditor' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Tab , Common , DatePicker , setCoverPlan , AddTag , wangEditor ){

	var Doom = {
		"pageType"   : $("#pageType"),

	};

	//标签处理	
	var TagObj = new AddTag( $("#addTags") , $("#tagModal") );

	var Global = {
		"type":true,
		"AllImgData" : [],
		"ext_title" : "",   //标题修改后，记录最开始的标题
	};

	var topicForm = $("#topicForm");
	var	FormElements = {
		"title"       : topicForm.find('input[name="title"]'),
		"publishtime" : topicForm.find('input[name="publishtime"]'),
		"mtime"       : topicForm.find('input[name="mtime"]'),
		"nick"        : topicForm.find('input[name="nick"]'),		
		"content"     : topicForm.find('#topicText'),
		"save"        : topicForm.find('#save')
	};	

	/* 编辑流程 ，获取话题详情 */
	function getTopicData (callback){
		var id = Common.dealurl("id" , "?");
		Common.ajax({
			"url" : window.IP + "/banner/GetBannerData",
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
		FormElements.publishtime.val((obj.publishtime+"").datechange());
		FormElements.nick.val(obj.nick);			
		
		if(obj.mtime == 0){
			FormElements.mtime.parent().hide();
		}else{
			FormElements.mtime.val((obj.mtime+"").datechange());
		}

		var tags = obj.tag.split(",");
		for(var m=0,len=tags.length;m<len;m++){
			TagObj.addNewTag(tags[m]);
		}

		/*try{
			obj.content = JSON.parse(obj.content);
			obj.pictures = obj.content.picUrl;
			obj.content = obj.content.text;
		}catch(e){
			alert("数据解析出错!");
			throw "数据解析错误";
		}*/
		try{
			obj.pictures = JSON.parse(obj.pictures);
			Global.AllImgData = obj.pictures.concat();
		}catch(e){	
			alert("数据解析出错!");
			throw "数据解析错误";		
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
		brReg = /#br#/g;

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
				contentE = FormElements.content.val();
			var sendData = {
					"sid": 1,
					"uid": 1,
					"type" : 1,
					"pictures":"",
					"tag" : TagObj.getAllChoiceTag().join(","),
				};	
			
			if(!titleE){
				alert('请填写标题');
				return false;
			}
			if(!contentE){
				alert('请输入内容');
				return false;
			}

			contentE = sortImgArr( contentE , Global.AllImgData );

			sendData.content = Common.escape2Html(contentE.content);
			sendData.pictures = JSON.stringify(contentE.pictures);
			sendData.title = titleE;

			//对图片进行重新排序后，检查是否还有图片
			if(!Global.AllImgData.length){
				alert("请上传图片");
				return false;
			}
			

			if(Global.type == "editor"){
				sendData.id = Common.dealurl("id" , "?");
			}	

			//话题类型添加 , 普通的 ，图文banner , 广告
			sendData.is_topic = 3;


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
						window.location.href = "/index/BannerImg?type=editor&id="+data.d.topicid;
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

	/* 添加话题，页面设置逻辑 */
	function addTopicInit(){
		Doom.pageType.html("图文Banner添加");
		FormElements.publishtime.parent().hide();
		FormElements.nick.parent().hide();
		FormElements.mtime.parent().hide();		
	}

	/* 编辑话题，页面逻辑设置 */
	function editorTopicInit(){	
		Doom.pageType.html("图文Banner编辑");
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





/*  wangEditor , plupload 插件使用  */
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
            value = JSON.parse(value);           
        	editorE.command(event, 'insertHTML', '<img data-id="#]'+value.rid+'#]" src="' + value.url + '"/>');      
        });
        //清空url数组
        urls = [];
        //清空显示列表
        $fileList.html('');
        progressE.reset();
    });

    //上传事件
    $btnUpload.click(function(e){
        //重要：将事件参数 e 赋值给 上文定义的 event 变量
        event = e;
        uploader.start();
    });


    /*  封面图设置  */
	var coverImg = new setCoverPlan($(".u_topic_text"));
});