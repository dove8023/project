<!-- 账号管理 -->
<?php 
	echo $header;
	echo $nav;
 ?>

<section class="u_main u_user" id="USERPAGE">
	<!-- 功能面板 -->

	<!-- <h1>
		Mustache 测试
	</h1>
	<div id="test">
		
	</div> -->



	<div>
		<strong class="font2 ml30 mr20">
			筛选
		</strong>
		<button class="btn btn-warning JS_tab_main active" data-number="0">
			所有用户
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="1">
			黑名单用户
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="2">
			禁言用户
		</button>
		<!-- <button class="btn btn-default">
			官方用户
		</button>
		<button class="btn btn-default">
		
		</button> -->
		
		<form action="" class="navbar-form inline-block">
			<input class="form-control" type="text" placeholder="昵称/手机号查找">
			
			<button class="btn btn-default" id="searchBtn">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				<strong>搜索</strong>
			</button>
		</form>
	</div>
	<div>
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
	</div>

	
	<!--  =========================== 普通用户展示 ==============================  -->
		
	<div class="JS_tab_Content">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th>ID</th>
					<th class="w150">用户名</th>
					<th>用户头像</th>
					<th>类型</th>
					<th>性别</th>
					<th>注册时间</th>
					<th>最后登录时间</th>
					<th>地域</th>
					<th>星座</th>
					<th>tel</th>
					<th>详情查看</th>
				</tr>
			</thead>
			<script type="text/template" id="userList_template2">
				{{#list}}
					<tr id="{{id}}">
						<td><input type="checkbox"></td>
						<th scope="row">{{id}}</th>
						<td>{{nick}}</td>
						<td>
							<img src="{{head}}" alt="">
						</td>
						<td>
							普通{{otherfn.toDateTime}}
						</td>
						<td>{{sex}}</td>
						<td>{{ctime}}</td>
						<td>
							{{ltime}}
						</td>
						<td>{{city}}</td>
						<td>{{constelltion}}</td>
						<td>
							{{phone}}
						</td>
						<td>					
							<button class="btn btn-warning JS_userDetail" data-id="{{id}}">详情查看</button>
						</td>				
					</tr>
				{{/list}}
			</script>
			<script type="text/template" id="userList_template">
				<tr id="{id}">
					<td><input type="checkbox"></td>
					<th scope="row">{id}</th>
					<td>{nick}</td>
					<td>
						<img src="{head}" alt="用户头像">
					</td>
					<td>
						{userType}
					</td>
					<td>{sex}</td>
					<td>{ctime}</td>
					<td>
						{ltime}
					</td>
					<td>{city}</td>
					<td>{constelltion}</td>
					<td>
						{phone}
					</td>
					<td>					
						<button class="btn btn-warning JS_userDetail" data-id="{id}">详情查看</button>
					</td>				
				</tr>	
			</script>
			<tbody id="userList">
									 
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right">
			<ul id="user_paging" class="pagination" data-current="1">
			</ul>
	   </nav>
	</div>

	<!-- ================================ 黑名单用户展示 ============================ -->
	<div class="JS_tab_Content" style="display:none;">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th>ID</th>
					<th class="w150">用户名</th>
					<th>用户头像</th>
					<th>类型</th>
					<th>性别</th>
					<th>注册时间</th>
					<th>操作员</th>
					<th class="w200">黑名单原因</th>
					<th>操作时间</th>
					<th>解除</th>
					<th>详情查看</th>
				</tr>
			</thead>
			<script type="text/template" id="darknameList_template">
				<tr>
					<td><input type="checkbox"></td>
					<th scope="row">{id}</th>
					<td>{nick}</td>
					<td>
						<img src="{head}" alt="用户头像">
					</td>
					<td>
						{userType}
					</td>
					<td>{sex}</td>
					<td>{ctime}</td>
					<td>
						{anick}
					</td>
					<td>
						{reason}
					</td>
					<td>{otime}</td>
					<td>
						<button class="btn btn-danger">解除</button>
					</td>
					<td>					
						<button class="btn btn-warning JS_userDetail" data-id="{id}">详情查看</button>
					</td>			
				</tr>	
			</script>
			<tbody id="darknameList">	 
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right">
			<ul id="darkname_paging" class="pagination" data-current="1">
			</ul>
	   </nav>
	</div>		

	<!-- ================================ 禁言用户展示 ============================ -->
	<div class="JS_tab_Content" style="display:none;">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th>ID</th>
					<th class="w100">用户名</th>
					<th>用户头像</th>
					<th>类型</th>
					<th>性别</th>
					<th>注册时间</th>
					<th>操作员</th>
					<th class="w200">禁言原因</th>
					<th>操作时间</th>
					<th>禁言次数</th>
					<th>解禁</th>
					<th>详情查看</th>
				</tr>
			</thead>
			<script type="text/template" id="shutupList_template">
				<tr id="{id}">
					<td><input type="checkbox"></td>
					<th scope="row">{id}</th>
					<td>{nick}</td>
					<td>
						<img src="{head}" alt="用户头像">
					</td>				
					<td>
						{userType}
					</td>
					<td>
						{sex}
					</td>
					<td>{ctime}</td>
					<td>{anick}</td>
					<td>
						{reason}
					</td>
					<td>{otime}</td>
					<td>
						<strong>{num}</strong>
					</td>
					<td>
						<button class="btn btn-danger">解除</button>
					</td>
					<td>					
						<button class="btn btn-warning JS_userDetail" data-id="{id}">详情查看</button>
					</td>				
				</tr>	
			</script>
			<tbody id="shutupList">				 
			</tbody>
		</table>
		<!-- 分页功能 -->
		<nav class="text-right">
			<ul id="shutup_paging" class="pagination" data-current="1">
			</ul>
	   </nav>
	</div>
	
</section>


<!-- 用户详情查看 -->

<div class="modal fade" id="UserInfo_modal" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title"><strong>用户详请及操作</strong></h4>
			</div>
			<div class="modal-body u_modal">				
				<div class="user_info" id="user_info">
					
				</div>	
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script type="text/template" id="user_info_template">
	<h4 class="modal-title">					
		<strong>
			用户信息
		</strong>
	</h4>
	<div class="mb10">
		<label>ID:</label>
		<span>{id}</span>

		<label>用户名:</label>
		<span>{nick}</span>

		<label>头像:</label>
		<span>
			<img src="{head}" alt="用户头像">
		</span>
	</div>
	<div class="mb10">
		
		<label>用户类型:</label>
		<span>{userType}</span>

		<label>注册时间:</label>
		<span>{ctime}</span>

		<label>上次登录:</label>
		<span>{ltime}</span>						
	</div>
	<div class="mb10">
		<label>地域:</label>
		<span>{province}{city}</span>

		<label>星座:</label>
		<span>{constelltion}</span>

		<label>tel:</label>
		<span>{phone}</span>
	</div>	
	<h4 class="modal-title">					
		<strong>
			查看操作
		</strong>
	</h4>								
	<div class="mb10">						
		<button class="btn btn-primary mr20 ml30">发布话题查看</button>						
		<button class="btn btn-success mr20">收藏话题查看</button>						
		<button class="btn btn-primary mr20">点赞话题查看</button>
		<button class="btn btn-success mr20">分享查看</button>
		<button class="btn btn-primary">回复查看</button>
	</div>
	<h4 class="modal-title">					
		<strong>
			其它操作
		</strong>
	</h4>
	<div class="mb10">
		<button class="btn btn-warning ml30">恢复默认头像</button>
	</div>
	<div class="mb10">
		<button class="btn btn-danger ml30">加入黑名单</button>
		<button class="btn btn-danger ml30">解除黑名单</button>
		{detail_states}
		<form action="" class="navbar-form inline-block2 ml30" style="display:none;">
			<input class="form-control" type="text" placeholder="请输入黑名单原因">
			<input class="form-control btn-primary" type="submit" value="提交">
			<button class="btn btn-default">取消</button>
		</form>					
	</div>
	<div>
		<button class="btn btn-danger ml30">禁言</button>
		<button class="btn btn-danger ml30">解禁</button>
		{detail_nospeak}	
		<form action="" class="navbar-form inline-block2" style="display:none;">
			<input class="form-control" type="text" placeholder="请输入禁言原因">
			<input class="form-control btn-primary" type="submit" value="提交">
			<button class="btn btn-default">取消</button>
		</form>	
	</div>
</script>




<script src="/static/js/pages/user/user.js"></script>
<?php echo $footer; ?>