<!-- 普通话题详情 -->
<?php
	echo $header;
 ?>
<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal" id="topicForm" ng-controller="form">
	<h1>
		<strong id="pageTitle">视频添加编辑</strong>
	</h1>
	<input type="hidden" id="contenttype" name="contenttype" value="3">
	<!-- 1,图文；3,视频；4,直播；5,H5 -->
	<!-- 公共部分 -->
	<?php
		echo $topicAddCommon;
	 ?>
	<!-- 公共部分 END -->
	<div class="mb10">
		<label class="pull-left" style="font-size:1em;">列表展示形式:</label>
		<select class="form-control w150 inline-block mr30" name="liststyle" ng-model="data.liststyle">
			<option value="3">视频</option>
			<option value="2">隐藏用户名</option>
		</select>
	</div>
	<div class="mb10">
		<label class="pull-left">打开方式:</label>
		<select class="form-control w150 inline-block mr30" name="openway" ng-model="data.openway">
			<option value="3">视频</option>			
		</select>
	</div>	
	<div class="mb10">
		<label class="pull-left">添加位置:</label>
		<select disabled="true" class="form-control w150 inline-block mr30" value="2" name="recommend">
			<option value="2">首页</option>
			<option value="0">广场页</option>
		</select>
	</div>
	<div class="mb10">
		<label class="pull-left">视频内容:</label>
		<div class="u_topic_text">
			<div id="uploadContainer" class="mb10">
			    <input type="button" class="btn btn-info" value="上传视频" id="upVideo"/> 
				<!-- 
							    <p class="blank_h15"></p>
							    <div class="u_progress3 mb20">
							    	<div id="u_progress" class="u_progress">
				    </div>
							    </div>	 -->

			</div>

			<div class="u_show_video">				
				<div id="showVideo">
					<video controls="controls" width="500" height="400" src=""></video>
				</div>						
			</div>				
										
		</div>
	</div>

	<div>
		<button class="pull-right btn btn-success btn-lg JS_window_close">关闭</button>
		<button type="submit" class="mr10 pull-right btn btn-primary btn-lg" ng-click="save()" id="save">保存</button>
	</div>
</section>

<script src="/static/js/pages/content/topic_video.js"></script>
<?php echo $footer; ?>