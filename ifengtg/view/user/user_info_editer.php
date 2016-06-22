<!-- 账号管理 -->
<?php 
	echo $header;	
 ?>

<section class="u_topic_detail center-block mt20 navbar-form u_editor_modal">
	<button class="pull-right btn btn-success btn-lg JS_window_close">关闭</button>
	
	<div ng-controller="TabCtrl">
		<button ng-class="{'btn-primary' : editer}" class="btn btn-lg mr20" ng-click="PageGo('editerInfo')">信息编辑</button>
		<button ng-class="{'btn-primary' : account}" class="btn btn-lg" ng-click="PageGo('manageCount')">账号管理</button>
	</div>
	
	<hr>
	
	<div ng-view>
		
	</div>
		
</section>



<script src="/static/js/pages/user/user_info_editer.js"></script>
<?php echo $footer; ?>