/**
 * 	content @ 普通话题添加，直播添加，活动添加。封面图上传，编辑器处理等拥有同样的业务逻辑，这里合并
 *  time    @ 2016/3/8
*/
define(['jQuery' , "APP/common_use" , "wangEditor"] , function(jQuery , Common , wangEditor){

	/*  =========  封面图上传 ========*/
	var pictureUpload = new Common.uploadFn({
		"btn" : "upload_cover_pic",
		"url" : '/upload/pics',
		"more": false,
		callback : function(data){
			if(!data.w || !data.h){
				alert("上传失败，请重传");
				return false;
			}
			document.getElementById('upload_cover_pic').children[0].src = data.url;
			Global.cover_pic[0] = data;
		}
	});

	/* ========== 编辑区多图上传 ====== */
	//上传图片页面元素获取
	var $uploadContainer = $('#uploadContainer'),
		$fileList = $('#fileList'),
		$btnUpload = $('#btnUpload');

	window.editorE = $("#topicText").wangEditor({
		"uploadImgComponent": $uploadContainer, //移动上传图片元素至编辑器内
		"menuConfig" : [
			['insertImage' , 'fullScreen' , 'bold' , 'foreColor' , 'setHead']
		],
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
              { title: "图片文件", extensions: "jpg,jpeg,gif,png,bmp" },
            ],
            prevent_duplicates : false, //允许选取重复文件
            // max_file_size : '400KB'
        },
        multipart_params : {}
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
    var watermarkE = document.getElementById('watermark');

    $btnUpload.click(function(e){
        //重要：将事件参数 e 赋值给 上文定义的 event 变量
        event = e;
        //是否需要水印
        if(watermarkE.checked){
        	uploader.settings.multipart_params.watermark = "0";
        }else{
        	uploader.settings.multipart_params.watermark = "2";
        }
        uploader.start();
    });

});