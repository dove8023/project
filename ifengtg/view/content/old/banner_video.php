<?php 
	echo $header;
 ?>
<p class="mb20">&nbsp;&nbsp;</p>
<section class="u_topic_detail center-block">
	<div class="mb10 pull-right">
		<a href="/index/BannerImg?type=add" class="btn btn-primary">
			图文Banner添加
		</a>
		<a href="/index/BannerVideo?type=add" class="btn btn-primary">
			视频Banner添加
		</a>
	</div>
	<h1>
		<strong id="pageType">视频Banner编辑</strong>
	</h1>
	<form class="navbar-form u_editor_modal" id="topicForm">
		<div class="mb10">
			<label>话题名称:</label>			
			<input type="text" name="title" maxlength="16"  placeholder="请输入话题名称" class="form-control w500">
		</div>		
		<!-- 有就显示 -->
		<div class="mb10">
			<label>发布时间:</label>
			 <input disabled="true" type="text" name="ctime" placeholder="发布时间" class="form-control">
		</div>
		<div class="mb10">
			<label>修改时间:</label>
			 <input disabled="true" type="text" name="mtime" placeholder="发布时间" class="form-control">
		</div>
		<div class="mb10">
			<label>作者:</label>
			<input disabled="true" type="text" name="nick" placeholder="发布作者" class="form-control">
		</div>		
		<div class="mb10">
			<label class="pull-left">标签:</label>
			<div class="inline-block u_tagsBox JS_tagBox">
				<button class="btn btn-success" id="addTags">添加</button>
			</div>
		</div>		
		<div class="mb10">
			<label>时长:</label>
			<input disabled="true" type="text" name="length" placeholder="视频时长" value="00:00:00" class="form-control">
		</div>
		<div class="mb10">
			<label>视频内容:</label>
			<div class="u_topic_text">
				<div id="uploadContainer">
				    <input type="button" class="btn btn-info" value="上传视频" id="upVideo"/>
				    <input type="button" class="btn btn-info" value="重选配图" id="upPicture"/>			    
				    <p class="blank_h15"></p>
				    <div class="u_progress3 mb20">
				    	<div id="u_progress" class="u_progress">
					    </div>
				    </div>					   
				</div>

				<div class="u_show_video">
					<span class="glyphicon glyphicon-remove u_video_remove btn-danger" aria-hidden="true" title="删除"></span>
					<div id="showVideo">
						
					</div>						
				</div>				
											
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

<script src="/static/js/pages/banner/banner_video.js"></script>
<?php echo $footer; ?>