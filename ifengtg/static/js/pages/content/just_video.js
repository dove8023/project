/**
 * content @ 内容管理，只是视频添加页面
*/

require(['Bootstrap' , 'APP/common_use' , 'libs/plupload/plupload.full.min' ] , function(Bootstrap , Common ){

	function uploadFn (option){
		//实例化一个上传对象
	    var uploader = new plupload.Uploader({
	        browse_button: option.btn,
	        url: option.url, 
	        flash_swf_url: '/static/js/libs/plupload/Moxie.swf',
	        sliverlight_xap_url: '/static/js/libs/plupload/Moxie.xap',
	        filters: {
	            mime_types: option.mime_types,
	            prevent_duplicates : false, //允许选取重复文件
	        },
	        max_file_size : 512000000,
	        max_retries : 3,  //上传失败重试3次
	        multi_selection : option.more,  //不可多选文件
	        multipart_params : {
        		"watermark" : 2  //告诉后台封面图不加水印
        	}
	    });
	    //初始化
	    uploader.init();
	    //绑定文件添加到队列的事件
	    uploader.bind('FilesAdded', function (uploader, files) {
	    	uploader.start();
	    	window.LOADING.style.display = "block";       
	    });
	    //单个文件上传之后
	    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
	        //从服务器返回url地址
	        var data = responseObject.response;	        
	        data = JSON.parse(data);
			option.callback(data);
			window.LOADING.style.display = "none";
	    });	   
	    uploader.bind("Error" , function(uploader , errObject){
	    	alert(errObject.message);
	    });
	}
	
	var videoUpload = new uploadFn({
		"btn" : "upVideo",
		"url" : '/upload/video',
		"more": false,
		"mime_types" : [],
		callback : function(data){
			console.log(data);
			$("#showVideo")[0].src = data.videoUrl;
			$("#showRid").html(data.rid);		
		}
	}); 
});