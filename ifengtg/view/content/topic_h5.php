<!-- 普通话题详情 -->
<?php
	echo $header;
 ?>
<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal" id="topicForm" ng-controller="form">
	<h1>
		<strong id="pageTitle">H5添加编辑</strong>
	</h1>
	<input type="hidden" id="contenttype" name="contenttype" value="5">
	<!-- 1,图文；3,视频；4,直播；5,H5 -->
	<!-- 公共部分 -->
	<?php
		echo $topicAddCommon;
	 ?>
	<!-- 公共部分 END -->
	<div class="mb10">
		<label class="pull-left" style="font-size:1em;">列表展示形式:</label>
		<select class="form-control w150 inline-block mr30" name="liststyle" ng-model="data.liststyle">
			<option value="2">隐藏用户名</option>
		</select>
	</div>
	<div class="mb10">
		<label class="pull-left">打开方式:</label>
		<select class="form-control w150 inline-block mr30" name="openway" ng-model="data.openway">			
			<option value="5">H5站内</option>
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
		<label class="pull-left">H5链接:</label>
		<input type="text" name="title"  placeholder="请输入H5链接" ng-model="data.ext_content.url" class="form-control w500">
	</div>
	<div>
		<button class="pull-right btn btn-success btn-lg JS_window_close">关闭</button>
		<button type="submit" class="mr10 pull-right btn btn-primary btn-lg" ng-click="save()" id="save">保存</button>
	</div>
</section>


<script src="/static/js/pages/content/topic_h5.js"></script>
<?php echo $footer; ?>