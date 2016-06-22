<!-- 账号管理 -->
<?php echo $header;echo $nav; ?>

<aside class="u_aside">
	<ul class="list-unstyled pt10">
		<li class="mb10">
			<button class="btn btn-info btn-md btn-block JS_tab_main" data-number="0">
				管理员列表
				<span class="badge">42</span>
			</button>
		</li>
		<li class="mb10">
			<button class="btn btn-default btn-md btn-block JS_tab_main" data-number="1">添加管理员</button>
		</li>
	</ul>
</aside>


<!-- 页面主要功能区 table 切换主元素 -->

<section class="u_main JS_tab_Content">
	<!-- 功能面板 -->
	<div>
		<strong>
			排序
		</strong>
		<button class="btn btn-default">
			<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
		</button>
		<button class="btn btn-default">
			<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
		</button>
		<form action="" class="navbar-form inline-block">
			<input class="form-control" type="text" placeholder="请输入账号">
			<input class="form-control" type="submit" value="搜索">
		</form>
	</div>
	
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>选择</th>
				<th>ID</th>
				<th>用户名</th>
				<th>上次登录时间</th>
				<th>权限设置</th>
				<th>密码重置</th>
				<th>禁止登录</th>
				<th>删除</th>
			</tr>
		</thead>
		<tbody>
			<tr class="">
				<td><input type="checkbox"></td>
				<th scope="row">1</th>
				<td>hellow world</td>
				<td>2015-10-20 09:40</td>
				<td>
					<button class="btn btn-warning">权限设置</button>
				</td>
				<td>
					<button class="btn btn-warning">密码重置</button>
				</td>
				<td>					
					<button class="btn btn-danger">禁止登录</button>
				</td>
				<td>
					<button class="btn btn-danger">删除</button>
				</td>
			</tr>
			<tr>
				<td><input type="checkbox"></td>
				<th scope="row">2</th>
				<td>hi every body.</td>
				<td>2015-10-20 09:40</td>
				<td>
					<button class="btn btn-warning">权限设置</button>
				</td>
				<td>
					<button class="btn btn-warning">密码重置</button>
				</td>
				<td>					
					<button class="btn btn-danger">禁止登录</button>
				</td>
				<td>
					<button class="btn btn-danger">删除</button>
				</td>
			</tr>
			<tr class="">
				<td><input type="checkbox"></td>
				<th scope="row">3</th>
				<td>good job.</td>
				<td>2015-10-20 09:40</td>
				<td>
					<button class="btn btn-warning">权限设置</button>
				</td>
				<td>
					<button class="btn btn-warning">密码重置</button>
				</td>
				<td>					
					<button class="btn btn-danger">禁止登录</button>
				</td>
				<td>
					<button class="btn btn-danger">删除</button>
				</td>
			</tr>       
		</tbody>
	</table>

	<!-- 分页功能 -->
	<nav class="text-right">
		<ul class="pagination">
			<li class="disabled">
				<span aria-label="Previous"><span aria-hidden="true">«</span></span>
			</li>
			<li class="active">				
				<span>
					1
					<span class="sr-only">(current)</span>
				</span>
			</li>
			<li>
				<span>2</span>
			</li>
			<li>
				<span>3</span>
			</li>
			<li>
				<span>4</span>
			</li>
			<li>
				<span>5</span>
			</li>
			<li>				
				<span aria-label="Next">
					<span aria-hidden="true">»</span>
				</span>
			</li>
		</ul>
   </nav>
</section>

<section class="u_main JS_tab_Content" style="display:none;">
	<h2>
		添加管理员
	</h2>
	
	<button id="one" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalTest">
		Launch demo modal
	</button>	
</section>



<div class="modal fade" id="modalTest" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Modal title</h4>
			</div>
			<div class="modal-body">
				<p>One fine body&hellip;</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->










<script src="/static/js/pages/account.js"></script>
<?php echo $footer; ?>