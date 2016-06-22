<!-- 账号管理 -->
<?php 
	echo $header;
 ?>
<link rel="stylesheet" href="/static/css/wangEditor-1.3.12.css">
<p class="mb20">&nbsp;&nbsp;</p>
<section class="u_topic_detail center-block">
	<div class="mb10 pull-right">
		<!-- <a href="/index/BannerImg?type=add" class="btn btn-primary">
			图文Banner添加
		</a>
		<a href="/index/BannerVideo?type=add" class="btn btn-primary">
			视频Banner添加
		</a> -->
	</div>
	<h1>
		<strong id="pageType">Banner编辑</strong>
	</h1>
	<form class="navbar-form u_editor_modal" id="topicForm">
		<div class="mb10">
			<label>话题名称:</label>			
			<input type="text" name="title" maxlength="16"  placeholder="请输入话题名称" class="form-control w500">
		</div>	
		<!-- 有就显示 -->
		<div class="mb10">
			<label>发布时间:</label>
			 <input disabled="true" type="text" name="publishtime" placeholder="发布时间" class="form-control">
		</div>
		<div class="mb10">
			<label>修改时间:</label>
			 <input disabled="true" type="text" name="mtime" placeholder="发布时间" class="form-control">
		</div>
		<div class="mb10">
			<label>发布作者:</label>
			<input disabled="true" type="text" name="nick" placeholder="发布时间" class="form-control">
		</div>		
		<div class="mb10">
			<label class="pull-left">标签:</label>
			<div class="inline-block u_tagsBox JS_tagBox">
				<button class="btn btn-success" id="addTags">添加</button>
			</div>
		</div>
		<div class="mb10">
			<label>话题内容:</label>&nbsp;&nbsp;(温馨提示:#br#代表回车符)
			<div class="u_topic_text">
				<div id="uploadContainer">
				    <input type="button" class="btn btn-info" value="选择文件" id="btnBrowse"/>
				    <input type="button" class="btn btn-info" value="上传文件" id="btnUpload">  (双击删除)
				    <ul id="fileList"></ul>
				    <p class="blank_h15"></p>
				    <div id="u_progress" class="u_progress">    	
				    </div>
				</div>
				<textarea name="" id="topicText">					
				</textarea>								
			</div>
		</div>

		<div>			
			<button class="pull-right btn btn-success btn-lg JS_window_close">关闭</button>
			<button type="submit" class="mr10 pull-right btn btn-primary btn-lg" id="save">保存</button>
		</div>
		
	</form>
</section>

<!-- 标签添加模态框 modal-sm-->
<div class="modal fade" id="tagModal" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">添加标签</h4>
			</div>
			<div class="modal-body">				
				<ul class="u_tags_list" id="u_tags_list">								
				</ul>			
			</div>
			<div class="modal-footer">
				<button type="button" id="saveTag" class="btn btn-primary">添加</button>
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>		
			</div>
		</div>
	</div>
</div>



<script src="/static/js/pages/banner/banner_img.js"></script>
<?php echo $footer; ?>