<!-- 普通话题详情 -->
<?php
	echo $header;
 ?>
<link rel="stylesheet" href="/static/css/wangEditor-1.3.12.css">
<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal" id="topicForm" ng-controller="form">
	<h1>
		<strong id="pageTitle">活动添加编辑</strong>
	</h1>
	<input type="hidden" id="contenttype" name="contenttype" value="7">
	<!-- 1,图文；3,视频；4,直播；5,H5；7,活动-->
	<!-- 公共部分 -->
	<!-- 内容添加公共区域 -->


	<div class="mb10">
		<label>标题:</label>
		<input type="text" name="title"  placeholder="请输入话题名称" ng-model="data.title" class="form-control w500">
	</div>
	
	<!-- 编辑状态展示,修改 -->	
	<!-- 有就显示 -->
	<div class="mb10" ng-show="isEditor">
		<label>历史标题:</label>
		<input disabled="true" type="text" name="ext_title" placeholder="历史名称" value="{{data.ext_title}}" class="form-control w500">
	</div>
	<div class="mb10">
		<label class="pull-left">内容类型:</label>
		<select disabled="true" id="test" class="form-control w150 inline-block mr30" name="recommend" ng-model="data.is_topic">
			<option value="1">话题类型</option>
			<option value="2">广告类型</option>			
			<option value="3">活动类型</option>
		</select>
	</div>
	<div class="mb10" ng-show="isEditor">
		<label>创建时间:</label>
		<input disabled="true" type="text" name="ctime" placeholder="创建时间" value="{{data.ctime | toTime}}" class="form-control">
	</div>
	<div class="mb10">
		<label>发布时间:</label>
		<input ng-disabled="data.gone_publish" id="publishtime" type="text" placeholder="默认为立即" ng-model="data.publishtime" class="form-control JS_datetime">
	</div>

	<div class="mb10">
		<label>开始时间:</label>
		<input id="startTime" type="text" placeholder="活动开始时间" class="form-control JS_datetime">
	</div>
	<div class="mb10">
		<label>结束时间:</label>
		<input id="endTime" type="text" placeholder="活动结束时间" class="form-control JS_datetime">
	</div>
	<div class="mb10">
		<label>导语:</label>
		<input type="text"  placeholder="请输入活动导语" ng-model="data.ext_content.info" class="form-control w500">
	</div>
	<div class="mb10">
		<label>参与选择:</label>		
		<select ng-model="data.ext_content.is_join" class="form-control w150 inline-block">
			<option value="0">不可参与</option>
			<option value="1">发文参与</option>
		</select>
	</div>
	
	<div class="mb10">
		<label>发布作者:</label>
		<select ng-if="!isEditor" ng-model="data.user_id" class="form-control w150 inline-block">
			<option value="">选择发布作者</option>
			<!-- <option value="66113849">识装大秘</option>	 -->
			<option ng-repeat="item in authorList" value="{{item.id}}">
				{{item.nick}}
			</option>
		</select>
		<input ng-if="isEditor" disabled="true" type="text" name="nick" placeholder="发布作者" value="{{data.nick}}" class="form-control">
	</div>
	<!-- 编辑状态展示 END -->

	<!-- 封面图设置 -->
	<div class="mb10">
		<label>
			封面图:
		</label>
		&nbsp;&nbsp;(点击上传)
		<div class="cover_pic u_topic_text" id="upload_cover_pic">	
			<img width="300" src="/static/images/aa.jpg" alt="封面图片">
		</div>
	</div>
	<!-- 公共部分 END -->

	<div class="mb10">
		<label class="pull-left" style="font-size:1em;">列表展示形式:</label>
		<select disabled="true" class="form-control w150 inline-block mr30" name="liststyle" ng-model="data.liststyle">
			<option value="1">话题</option>
			<option value="2">隐藏用户名</option>
			<option value="6">H5活动</option>		 	
		</select>
	</div>
	<div class="mb10">
		<label class="pull-left">打开方式:</label>
		<select disabled="true" class="form-control w150 inline-block mr30" name="openway" ng-model="data.openway">
			<option value="1">话题</option>
			<option value="2">无用户信息</option>
			<option value="6">无操作</option>  
			<option value="5">H5站内</option>  
		</select>
	</div>
	<!-- 普通话题区域 -->
	<div ng-controller="thumbComment" class="mb10" ng-show="isEditor">
		<label>点赞数:</label>
		<input type="text" ng-model="data.praise_count" name="praise_count" data-type="Praise"  class="form-control w100">
		<button ng-click="changeThumb()" class="btn btn-primary JS_topic_count">提交</button>
		
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
		<select disabled="true" class="form-control w150 inline-block mr30 disabled" name="recommend" ng-model="data.recommend">
			<option value="2">首页</option>
			 <option value="0">广场页</option>
			<option value="3">活动页</option>
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

<script src="/static/js/pages/content/topic_active.js"></script>
<?php echo $footer; ?>