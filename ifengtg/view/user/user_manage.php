<!-- 账号管理 -->
<?php 
	echo $header;
	echo $nav;
 ?>

<section class="u_main u_user"  ng-controller="UserList">
	<div class="mb10" ng-controller="TabChange">
		<strong class="font2 ml30 mr20">
			筛选
		</strong>	

		<button ng-class="{'active':item.show}" class="btn btn-warning ml5" ng-repeat="item in tabs" ng-click="change($index , item)">
			{{item.name}}
		</button>
		
		<form ng-submit="goSearch()" class="navbar-form inline-block" ng-controller="UserSearch">
			<input ng-model="SearchData.content" class="form-control" type="text" placeholder="昵称/手机号查找">
			
			<button class="btn btn-default" id="searchBtn">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				<strong>搜索</strong>
			</button>
		</form>
	</div>
	<!-- <div class="mb10">
		<strong class="font2 mr10">
			范围选择
		</strong>
		<button class="btn u_btn">
			话题数
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<select class="form-control w100 inline-block mr30" name="" id="">
			<option value="">选择</option>
			<option value="">&lt;50</option>
			<option value="">50~100</option>
			<option value="">100~250</option>
			<option value="">250~300</option>
			<option value="">&gt;300</option>
		</select>
	
		<button class="btn u_btn">
			分享数
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<select class="form-control w100 inline-block mr30" name="" id="">
			<option value="">选择</option>
			<option value="">&lt;50</option>
			<option value="">50~100</option>
			<option value="">100~250</option>
			<option value="">250~300</option>
			<option value="">&gt;300</option>
		</select>
	
		<button class="btn u_btn">
			时间范围
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<input class="JS_date form-control inline-block w100" type="text" placeholder="开始时间">
		<input class="JS_date form-control inline-block w100" type="text" placeholder="结束时间">
	
		<button class="btn btn-info">
			<strong>按当前条件查找</strong>
		</button>
	</div> -->	
	
	<!--  =========================== 普通用户展示 ==============================  -->
	<div>
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<!-- <th>选择</th> -->
					<th>ID</th>
					<th class="w150">用户名</th>
					<th>用户头像</th>
					<th>类型</th>
					<th>性别</th>
					<th class="w150">注册时间</th>
					<th class="w150">最后登录时间</th>
					<th>地域</th>
					<th>星座</th>
					<th class="w150">tel</th>
					<th>操作</th>
				</tr>
			</thead>			
			<tbody>
				<tr ng-repeat="item in showlist">
					<th scope="row">{{item.id}}</th>
					<td>{{item.nick}}</td>
					<td>
						<img ng-src="{{item.head | head_img}}" alt="">
					</td>
					<td>
						{{item.nospeak | nospeak_deal}}
						{{item.status | status_deal}}
						{{item.is_editer | is_editer_deal}}
					</td>
					<td>{{item.sex | sex}}</td>
					<td>{{item.ctime | toTime}}</td>
					<td>
						{{item.ltime | toTime}}
					</td>
					<td>{{item.city}}</td>
					<td>{{item.constelltion}}</td>
					<td>
						{{item.phone}}
					</td>
					<td>					
						<div>
							<button ng-click="goDetail(item.id)" class="btn btn-success">
								详情查看
							</button>
						</div>
					</td>				
				</tr>				 
			</tbody>
		</table>
		<strong class="user_tip" ng-cloak ng-show="!showlist.length">无数据</strong>
		<!-- 分页功能 -->
		
		<paging loader="GetData(nowpage - 1)" ng-show="showlist.length" everynum="{{EveryPage}}" ng-count="{{Count}}"></paging>
	</div>
	
		
</section>

<script src="/static/js/pages/user/user_manage.js"></script>
<?php echo $footer; ?>