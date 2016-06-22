<!-- 账号管理 -->
<?php 
	echo $header;	
 ?>
<style>
	.user_info{
		width: 90%;
	}
</style>
<section class="u_main u_user" id="USERPAGE">
	<button class="btn btn-primary btn-lg pull-right JS_window_close">
		关闭
	</button>
	<h1>
		<strong>用户详情查看</strong>
	</h1>
	<!-- 用户详情 -->
	<div class="user_info user_info_detail" ng-controller="UserInfo">
		<h4 class="modal-title">					
			<strong>
				用户信息
			</strong>
		</h4>
		<div class="mb10">
			<label>ID:</label>
			<span>{{userData.id}}</span>

			<label>用户名:</label>
			<span>{{userData.nick}}</span>

			<label>头像:</label>
			<span class="text-center">
				<img ng-src="{{userData.head | head_img}}" alt="用户头像">
			</span>
		</div>
		<div class="mb10">
			
			<label>用户类型:</label>
			<span>&nbsp;{{userData.is_editer | is_editer_deal}}</span>

			<label>注册时间:</label>
		<span>{{userData.ctime | toTime}}</span>

			<label>上次登录:</label>
			<span>&nbsp;{{userData.ltime | toTime}}</span>		
		</div>
		<div class="mb10">
			<label>地域:</label>
			<span>{{userData.province}}&nbsp;&nbsp;{{userData.city | nothing}}</span>

			<label>星座:</label>
			<span>{{userData.constelltion | nothing}}</span>

			<label>tel:</label>
			<span>{{userData.phone | nothing}}</span>
		</div>	
	</div>
	<hr>

	<!-- 功能操作 -->	
	<div class="user_info" ng-controller="UserOption">
		<h4 class="modal-title">					
			<strong>
				其它操作
			</strong>
		</h4>
		<div class="mb10 fl cb">
			<button ng-click="setDefaultImg()" class="btn btn-warning">恢复默认头像</button>
			<button class="btn btn-default" ng-click="getRecord('head')">
				操作记录
			</button>
		</div>
		<div class="mb10 fl cb">
			<button ng-click="setDefaultName()" class="btn btn-dark">恢复默认昵称</button>
			<button class="btn btn-default" ng-click="getRecord('nick')">
				操作记录
			</button>
		</div>		
		<div class="mb10 fl cb">
			<button ng-if="userData.status == 1" ng-click="joinBlack(true)" class="btn btn-danger">加入黑名单</button>

			<button ng-if="userData.status == 0" ng-click="joinBlack(false)" class="btn btn-info">解除黑名单</button>

			<button class="btn btn-default" ng-click="getRecord('black')">
				操作记录
			</button>							
		</div>
		<div class="mb20 fl cb">
			<button ng-if="userData.nospeak == 1" ng-click="joinNoSay(true)" class="btn btn-danger">禁言</button>
			<button ng-if="userData.nospeak == 0" ng-click="joinNoSay(false)" class="btn btn-info">解禁</button>
			<button class="btn btn-default" ng-click="getRecord('nospeak')">
				操作记录
			</button>			
		</div>

		
		<table ng-cloak ng-show="ShowRecord" class="table u_table user_table_record" style="margin-left:280px;">
			<thead>
				<tr>
					<th>操作ID</th>
					<th class="w100">类型</th>
					<th class="w200">原因</th>
					<th class="w150">时间</th>
					<th>操作人</th>
				</tr>				
			</thead>
			<tbody>
				<tr ng-repeat="item in RecordData">
					<th scope="row">{{item.id}}</th>
					<td>{{item.type | OperationType}}{{item.extra | isAdd}}</td>
					<td>{{item.reason}}</td>
					<td>{{item.ctime | toTime}}</td>
					<td>{{item.anick}}</td>
				</tr>									
			</tbody>
		</table>
	</div>

	<!-- 其它查看操作 -->
	<div class="user_info cb" ng-controller="UserInfoList">
		<h4 class="modal-title">					
			<strong>
				其它查看
			</strong>
		</h4>
		<div class="mb10 user_list_show">
			<button ng-repeat="item in listType" class="btn btn-info user_list_show_btn" ng-class='{active : tabList[item.type]}' ng-click="listChange($index , item)">{{item.name}}</button>		
			
			<div ng-view class="user_list_box" ng-cloak ng-show="ListShow">		
				
			</div>
		</div>		
	</div>

	
	<!-- <div ng-controller="hello">
		hello
		<button class="btn btn-success" ng-click="say()">ssss</button>
	</div> -->
</section>

<!-- 原因写入模态框 -->
<div class="modal fade" id="reasonModal" role="dialog" aria-labelledby="mySmallModalLabel" ng-controller="Reason">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">
					<strong>{{ReasonParam.title}}</strong>
				</h4>
			</div>
			<div class="modal-body">
				<input ng-model="ReasonParam.reason" type="text" placeholder="请输入原因" class="form-control">
			</div>
			<div class="modal-footer">				
				<button type="button" ng-click="SendData()" class="btn btn-primary">确认</button>
				<button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->





<script src="/static/js/pages/user/user_detail.js"></script>
<?php echo $footer; ?>