<!-- 普通话题详情 -->
<?php
	echo $header;
 ?>
<link rel="stylesheet" href="/static/css/wangEditor-1.3.12.css">
<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal" id="topicForm" ng-controller="form">
	<h1>
		<strong id="pageTitle">普通话题添加编辑</strong>
	</h1>
	<input type="hidden" id="contenttype" name="contenttype" value="1">
	<!-- 1,图文；3,视频；4,直播；5,H5 -->
	<!-- 公共部分 -->
	<?php
		echo $topicAddCommon;
	 ?>
	<!-- 公共部分 END -->

	<div class="mb10">
		<label class="pull-left" style="font-size:1em;">列表展示形式:</label>
		<select class="form-control w150 inline-block mr30" name="liststyle" ng-model="data.liststyle">
			<option value="1">话题</option>
			<option value="2">隐藏用户名</option>			
		</select>
	</div>
	<div class="mb10">
		<label class="pull-left">打开方式:</label>
		<select class="form-control w150 inline-block mr30" name="openway" ng-model="data.openway">
			<option value="1">话题</option>
			<option value="2">无用户信息</option>
			<option value="6">无操作</option>
		</select>
	</div>
	<!-- 普通话题区域 -->
	<div ng-controller="thumbComment" class="mb10" ng-show="isEditor">
		<label>点赞数:</label>
		<input type="text" ng-model="data.praise_count" name="praise_count" data-type="Praise"  class="form-control w100">
		<button ng-click="changeThumb()" class="btn btn-primary JS_topic_count">提交</button>
		
		<!-- <label class="ml15">评论数:</label>
		<input type="text" ng-model="data.comment_count"  name="comment_count" data-type="Comment" class="form-control w100">
		<button ng-click="changeComment()" class="btn btn-primary JS_topic_count">提交</button> -->
	</div>

	<div class="mb10">
		<label class="pull-left">标签: </label>
		<div class="inline-block u_tagsBox JS_tagBox">
			<div ng-repeat="item in showTags" class="btn" ng-click="tagDelete($index)" >
				{{item}}
			</div>
			<b style="font-size:12px;font-weight:normal;">
				(点击删除)
			</b>		
			<button ng-click="addTag()" class="btn btn-success" id="addTags">添加</button>
		</div>
	</div>

	<div class="mb10">
		<label class="pull-left">添加位置:</label>
		<select ng-model="data.recommend" class="form-control w150 inline-block mr30" name="recommend">
			<option value="2">首页</option>
			<option value="0">广场页</option>
		</select>
	</div>

	
	<div class="mb10">
		<label>话题内容:</label>&nbsp;&nbsp;(温馨提示:&rarr;代表回车符,继续输入即可例如 今天&rarr;明天 显示即为2行)
		<br>
		<label>&nbsp;&nbsp;&nbsp;&nbsp;</label>		
		<div class="u_topic_text">
			<div id="uploadContainer">				
				<label>
					<input id="watermark" type="checkbox">水印
				</label>
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
		<button type="submit" class="mr10 pull-right btn btn-primary btn-lg" ng-click="save()" id="save">保存</button>
	</div>
</section>


<!-- 标签添加模态框 modal-sm-->
<div class="modal fade" id="tagModal" role="dialog" aria-labelledby="mySmallModalLabel" ng-controller="tag">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">添加标签</h4>
			</div>
			<div class="modal-body">
				<ul class="u_tags_list">
					<li ng-repeat="item in tags" class="checkbox">
						<label>
							<input ng-model="item.ischoice" type="checkbox">
							<span>{{item.name}}</span>
						</label>
					</li>
				</ul>
			</div>
			<div class="modal-footer">
				<button type="button" ng-click="saveTag()" class="btn btn-primary">添加</button>
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script src="/static/js/pages/content/topic_normal.js"></script>
<?php echo $footer; ?>