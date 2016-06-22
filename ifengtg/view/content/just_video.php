<!-- 普通话题详情 -->
<?php
	echo $header;
 ?>
<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal" id="topicForm">
	<button class="pull-right btn btn-success btn-lg JS_window_close">关闭</button>

	<h1>
		<strong id="pageTitle">单视频添加</strong>
	</h1>
	
	<div class="mb10">
		<label>返回信息:</label>
		<strong class="all_btn">
			2190606#<span id="showRid"></span>
		</strong>
	</div>
	<div class="mb10">
		<label class="pull-left">视频内容:</label>
		<div class="u_topic_text">
			<div id="uploadContainer" class="mb10">
			    <input type="button" class="btn btn-info" value="上传视频" id="upVideo"/>
			</div>

			<div class="u_show_video">				
				<div>
					<video id="showVideo" controls="controls" width="500" height="400" src=""></video>
				</div>						
			</div>				
										
		</div>
	</div>	
</section>

<script src="/static/js/pages/content/just_video.js"></script>
<?php echo $footer; ?>