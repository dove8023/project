<!-- 账号管理 -->
<?php
	echo $header;
 ?>
<link rel="stylesheet" href="/static/css/wangEditor-1.3.12.css">
<p class="mb20">&nbsp;&nbsp;</p>
<section class="u_topic_detail center-block">
	<div class="mb10">
		<button class="btn btn-primary btn-lg pull-right" id="addTopic">
			添加话题
		</button>
	</div>
	<h1>
		<strong>话题详情查看编辑</strong>
	</h1>
	<form class="navbar-form u_editor_modal" id="topicForm">
		<div class="mb10">
			<label>话题名称:</label>
			<input type="text" name="title"  placeholder="请输入话题名称" class="form-control w500">
		</div>
		<!-- 有就显示 -->
		<div class="mb10">
			<label>历史名称:</label>
			<input disabled="true" type="text" name="ext_title" placeholder="历史名称" class="form-control w500">
		</div>
		<!-- 有就显示 -->
		<div class="mb10">
			<label>发布时间:</label>
			 <input disabled="true" type="text" name="publishtime" placeholder="发布时间" class="form-control">
		</div>
		<div class="mb10">
			<label>发布作者:</label>
			<input disabled="true" type="text" name="nick" placeholder="发布作者" class="form-control">
			<!-- <select name="" id="editer" class="w150 form-control" style="display:none;">
				<option value="0">编辑选择</option>
			</select>
			<select name="" id="offical" class="w150 form-control" style="display:none;">
				<option value="0">官方用户选择</option>
			</select> -->
		</div>
		<div class="mb10">
			<label>点赞数:</label>
			<input type="number" name="praise_count" data-type="Praise" class="form-control w100">
			<button class="btn btn-primary JS_topic_count">提交</button>
			<label class="ml15">评论数:</label>
			<input type="number" name="comment_count" data-type="Comment" class="form-control w100">
			<button class="btn btn-primary JS_topic_count">提交</button>
		</div>
		<div class="mb10">
			<label class="pull-left">标签:</label>
			<div class="inline-block u_tagsBox JS_tagBox">
				<button class="btn btn-success" id="addTags">添加</button>
			</div>
		</div>
		<div class="mb10">
			<label class="pull-left">添加位置:</label>
			<select class="form-control w150 inline-block mr30" id="recommend">
				<option value="2">首页</option>
				<option value="0">广场页</option>
			</select>
		</div>
		<div class="mb10">
			<label>话题内容:</label>&nbsp;&nbsp;(温馨提示:#br#代表回车符,继续输入即可例如 今天#br#明天 显示即为2行)
			<br>
			<label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
			双击添加/取消封面图设置
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



<script src="/static/js/pages/topic_detail.js"></script>
<?php echo $footer; ?>