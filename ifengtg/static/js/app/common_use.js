/**
 *	后台系统使用到的公用函数模块
 *	备注：所有页面均需引入该模块
*/

define(['jQuery' , 'libs/plupload/plupload.full.min'] , function(jQuery){

	/* ================ JS基本对象方法扩展 ============ */


	/* json数据 对接 html模板*/
	String.prototype.temp = function(obj){
		return this.replace(/\{(\w+)\}/gi , function(matchs){
			var returns = obj[matchs.replace(/(\{)?(\})?/g , "")];
			return (returns + "") == "undefined" ? "" : returns;
		});
	}

	/* 时间戳 , (时间戳为秒) 转化为标准时间 */
	String.prototype.datechange = function(){
		if(this.length !== 10){
			return "";
		}
		var str = this * 1000;
		var d = new Date(str);
		var hour , min , sec;
		hour = d.getHours();
		min  = d.getMinutes();
		sec  = d.getSeconds();
		if(hour < 10){
			hour = '0' + hour;
		}
		if(min < 10){
			min = '0' + min;
		}
		if(sec < 10){
			sec = '0' + sec;
		}
		return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+hour+":"+min+":"+sec;
	}
	
	/* 将秒转化为时，分 */
	String.prototype.toTime = function(){
		var s = this * 1,
			h = parseInt(s / 3600),
			m = parseInt( ( s % 3600 ) / 60 ),
			s = s - h*3600 - m*60;
		if(s<10){
			s = '0' + s;
		}
		if(m < 10){
			m = '0' + m;
		}
		if(h < 10){
			h = '0' + h;
		}

		return h + ':' + m + ':' + s;
	}

	Number.prototype.toTime = String.prototype.toTime;

	/* 将时间00:00:00转化为秒 */
	String.prototype.toSecond = function(){
		var times = this,
			s = 0;
		times = times.split(":");
		console.log(times);
		s = times[0] * 3600;
		s = s + times[1] * 60;
		s = s + times[2] * 1;
		return s;
	}

	/* 将时间格式转化为10位时间戳 */
	String.prototype.toTimestamp = function(){
		var time = new Date(this);
		time = (+time).toString();
		time = time.substr(0,10);

		return time;
	}

	/*
		从一个数组中找出某个值
		[ {rid:1,} , {rid:2}]
		匹配rid == 2 这一项

		传入查找的 键名 和 键值
	*/
	Array.prototype.findOne = function( key , value ){
		//this 即这个数组
		var len = this.length;
		for(var i=0;i<len;i++){
			if(this[i][key] == value){
				return this[i];
			}
		}
	}


	/* ================ JS基本对象方法扩展  END ============ */



	/* 根据环境不同数据请求地址不同 */
	//12月版本已不再使用
	function IPfn (){
		var host = location.host , reg = /-/g;
		var ipReg = /172.30.204.92/g;
		if(reg.test(host)){
			//本地环境
			window.IP = "http://"+host;
		}else{
			if(ipReg.test(host)){
				//测试环境
				window.IP = "http://"+host;
			}else{
				//线上环境
				window.IP = "http://10.90.3.41:8100";
			}
		}
	}

	// IPfn();

	/*  处理url，获取string的值  */
	function dealurl (string , split){
	    var str = location.href;
	    var arr = str.split(split)[1];
	    if(arr){
	        arr = arr.split("&");
	    }else{
	        return false;
	    }
	    var result;
	    for(var i=0,len=arr.length;i<len;i++){
	    	var temp = arr[i].split("=");
	    	if(temp[0] == string){
	    		result = temp[1];
	    		break;
	    	}
	    }
	    if(result){
	        return result;
	    }else{
	        return false;
	    }
	}

	/* 话题内容处理： 生成包含图片的内容 ,content(包含 [)#](字符串),pics图片数组 */
	function dealTopicContent (content , picsd){
		var pics = Array();
		try{
			picsd = JSON.parse(picsd);
		}catch(e){
			
		}
		pics = picsd.concat();
		for(var i=0,len=pics.length;i<len;i++){
			pics[i] = '<img data-id="#]'+pics[i].rid+'#]" src="'+pics[i].url+'" alt="" />';
		}
		content = content.split("[)#](");
		for(var j=0,len2=content.length;j<len2;j++){
			if(pics[j]){
				content[j] = content[j] + pics[j];
			}
		}
		var str = content.join("");
		if(j<i){
			for(var n=0;n<len-len2;n++){
				str += pics[j+n];
			}
		}
		return str;
	}

	/* ====== 由图片数组和包含特殊符号文本合成展示内容， 由展示内容分离为APP可显示文本和对应顺序数组 ====== */
	function DealPictureText (){
		this.rarr = /→|&rarr;/g;
		this.brReg = /#br#/g;
		this.idReg = /(#](.*?)#])/g;
		this.imgReg = /<img[^>]+>/g;
		this.htmlReg = /<[^>]*>/g;
		this.strReg = /#]/g;
		this.nReg = /\n/g;
	}

	//接收文本 ，图片数组 ，回调函数；返回可在网页显示的html片段
	DealPictureText.prototype.compound = function( content , picsd , callback){
		var _this = this;
		var pics = Array();
		try{
			picsd = JSON.parse(picsd);
		}catch(e){			
		}
		pics = picsd.concat();
		for(var i=0,len=pics.length;i<len;i++){
			pics[i] = '<img data-id="#]'+pics[i].rid+'#]" src="'+pics[i].url+'" alt="" />';
		}
		content = content.split("[)#](");
		for(var j=0,len2=content.length;j<len2;j++){
			if(pics[j]){
				content[j] = content[j] + pics[j];
			}
		}
		var str = content.join("");
		if(j<i){
			for(var n=0;n<len-len2;n++){
				str += pics[j+n];
			}
		}
		// str = str.replace(_this.brReg , "<br>&rarr;");
		str = str.replace(_this.brReg , "<br>");
		return callback && callback(str);
	}
	//接收文本 ，图片数组。返回处理后的文本，调整顺序后的图片数组。
	DealPictureText.prototype.separate = function( str , arr ){
		var _this = this;
		var rids = str.match(_this.idReg),
			newArr = [];
		if(rids == null){
			rids = [];
		}

		//进一步提取出rid
		for(var m=0,len0=rids.length;m<len0;m++){
			rids[m] = rids[m].replace(_this.strReg , "");
		}
		//str 中包含的rid，将其图片数据放入返回数组
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
		//过滤返回文本,将img用特殊符号代替，过滤html.
		str = str.replace(_this.imgReg , "[)#](");
		str = html_decode(str);
		// str = str.replace(_this.rarr , "#br#");
		// str = str.replace(_this.htmlReg , "");
		return {
			"content" : str,
			"pictures" : newArr
		}
	}


	/* 依据hash值，控制导航栏active项高亮显示；(考虑使用本地存储替代该功能) */
	function navActive (){
		var navE = $("#nav"),
			activeE = dealurl("nav" ,"#");
		navE.find("li").removeClass("active");
		var thisli = navE.find('li[data-name="'+activeE+'"]');
		thisli.addClass("active");
		$("title").html(thisli.find("a").html());
	}

	navActive();


	/* ajax 请求函数 */
	function ajax (option){
		$.ajax({
			url : option.url,
			dataType : "json",
			type : "post",
			data : option.data,
			success : function(data){
				option.success(data);
			},
			error : function(){
				alert("ajax , 数据请求失败");
			},
			beforeSend : function(){				
				return option.beforeSend && option.beforeSend();
			},
			complete : function(){				
				return option.complete && option.complete();
			}
		});
	}

	/* 进度条控制 , 传入 0.85 , 使用场景参考js/pages/content/topic_normal.js */
	function progressfn (obj){
		this.obj = obj;
		this.obj.addClass("u_progress");
		this.spanE = $("<span></span>");
		this.spanE.appendTo(this.obj);
	}
	progressfn.prototype.move = function(num){
		this.spanE.css("width" , num*100+"%");
	}
	progressfn.prototype.reset = function(){
		this.spanE.css("width" , 0);
	}


	/* 关闭当前页面按钮 */
	$(".JS_window_close").click(function(event){
		event.preventDefault();
		window.close();
	});

	//转意符换成普通字符
	function escape2Html(str) {
		var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
	}


	/* 轮询某个值，有时执行回调操作;  传入轮询某个值的函数 ，传入轮询结束时的回调函数 */
	function Polling ( judgefn , callback ){
		var _this = this;
		this.timer = null;
		this.timer = setInterval(function(){
			if(judgefn()){
				clearInterval(_this.timer);
				callback();
			}
		} , 100);
	}

	/*  cookie 读取  */
	function ReadCookie ( names ){

		if(!names){
			return false;
		}
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for( var i=0, len = cookies.length; i < len; i++ ){
			var parts = cookies[i].split("=");

			if(names === parts[0]){
				//应对可能的中文
				return decodeURIComponent(parts[1]);
			}
		}
	}

	

	/* LOADING 元素 */
	window.LOADING = document.getElementById('LOADING');

	/*
		单个图片上传，用于头像上传，封面图上传
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
	             	{ title: "图片文件", extensions: "jpg,jpeg,gif,png,bmp" },
	            ],
	            prevent_duplicates : false, //允许选取重复文件
	        },
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
	}

	/* angular http 发送数据转换  transform */
	function transform(data){
		return $.param(data);
	}


	/**
	 * html标记转换
	*/
	function html_encode(str)  
	{
		var s ="";  
		if(str.length == 0)return"";  
		s = str.replace(/&/g,"&amp;");
		s = s.replace(/</g,"&lt;");  
		s = s.replace(/>/g,"&gt;");  
		s = s.replace(/ /g,"&nbsp;");  
		s = s.replace(/\'/g,"&#39;");  
		s = s.replace(/\"/g, "&quot;");  
		s = s.replace(/\n/g, "<br>");  
		return s;  
	}  
	 
	function html_decode(str)  
	{
		var s = "";  
		if (str.length == 0) return "";  
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");  
		s = s.replace(/&gt;/g, ">");  
		// s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");  
		s = s.replace(/&quot;/g, "\"");  
		// s = s.replace(/<br>/g,"\n");  
		return s;  
	}

	


	return {
		"dealurl"             : dealurl,
		"ajax"                : ajax,
		"dealTopicContent"    : dealTopicContent,
		"progressfn"          : progressfn,
		"escape2Html"         : escape2Html,
		"Polling"             : Polling,
		"ReadCookie"          : ReadCookie,
		"DealPictureText"     : DealPictureText,
		"transform"           : transform,
		"uploadFn"            : uploadFn,
		"html_encode"         : html_encode,
		"html_decode"         : html_decode
	}
});