<!-- 内容添加公共区域 -->


<div class="mb10">
	<label>标题:</label>
	<input type="text" name="title"  placeholder="请输入话题名称" ng-model="data.title" class="form-control w500">
</div>
<!-- <ul>
	<li ng-repeat="phone in arr | filter:data.title">{{phone}}</li>
</ul> -->
<!-- 编辑状态展示,修改 -->	
<!-- 有就显示 -->
<div class="mb10" ng-show="isEditor">
	<label>历史标题:</label>
	<input disabled="true" type="text" name="ext_title" placeholder="历史名称" value="{{data.ext_title}}" class="form-control w500">
</div>
<div class="mb10">
	<label class="pull-left">内容类型:</label>
	<select id="test" class="form-control w150 inline-block mr30" name="recommend" ng-model="data.is_topic">
		<option value="1">话题类型</option>
		<option value="2">广告类型</option>
	</select>
</div>
<div class="mb10" ng-show="isEditor">
	<label>创建时间:</label>
	<input disabled="true" type="text" name="ctime" placeholder="创建时间" value="{{data.ctime | toTime}}" class="form-control">
</div>
<div class="mb10">
	<label>发布时间:</label>
	<input ng-disabled="data.gone_publish" id="publishtime" type="text" placeholder="默认为立即" ng-model="data.publishtime" class="form-control">
</div>
<!-- <div class="mb10" ng-show="isEditor">
	<label>发布作者:</label>
	<input disabled="true" type="text" name="nick" placeholder="发布作者" value="{{data.nick}}" class="form-control">		
</div> -->
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