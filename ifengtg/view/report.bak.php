<!-- 举报管理 -->
<?php echo $header;echo $nav; ?>

<aside class="u_aside">
	<ul class="list-unstyled pt10">
		<li class="mb10">
			<button class="btn btn-info btn-md btn-block JS_tab_main" data-number="0">
				话题举报列表
				<span class="badge" id='topic_report_count'></span>
			</button>
		</li>
		<li class="mb10">
			<button class="btn btn-default btn-md btn-block JS_tab_main" data-number="1">
				评论举报列表
				<span class="badge" id='comment_report_count'></span>
			</button>
		</li>
		<li class="mb10">
			<button class="btn btn-default btn-md btn-block JS_tab_main" data-number="2">
			举报原因管理
			<span class="badge" id='reason_count'></span>
			</button>
		</li>
	</ul>
</aside>


<!-- 页面主要功能区 table 切换主元素 -->

<section class="u_main JS_tab_Content">
	<!-- 功能面板 -->
	<!--<div>
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
	</div>-->
	
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>被举报人昵称(举报次数)</th>
				<th>举报内容(举报次数)</th>
				<th>举报原因</th>
				<th>举报时间</th>
				<th>举报人昵称</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody id='topic_report_list'>
		</tbody>
	</table>

	<!-- 分页功能 -->
	<nav class="text-right">
		<ul class="pagination" id='nav_page_topic'>
		</ul>
   </nav>
</section>

<script type="text/template" id="topic_report_listTemplate">
{{ #list }}
	<tr id='{{ reported_userid }}'>
		<td rowspan='{{ reported_count }}'>{{ reported_usernick }}({{ count }})</td>
		<td class="td_line"></td>
		<td></td>
		<td></td>
		<td></td>				
		<td></td>
	</tr>
	{{ #reported_content }}
	<tr id='{{ id }}' data-userid='{{ reported_userid }}'>
	<td class="td_line">{{ content }}({{ count }})</td>
	<td></td>
	<td></td>
	<td></td>				
	<td><button class="btn btn-primary JS_BTN_DETAIL">查看详情</button></td>
	</tr>
	{{ /reported_content }}
	{{ /list }}
</script>
		
<section class="u_main JS_tab_Content" style="display:none;">	
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>被举报人昵称(举报次数)</th>
				<th>举报内容(举报次数)</th>
				<th>举报原因</th>
				<th>举报时间</th>
				<th>举报人昵称</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody id='comment_report_list'>
		</tbody>
	</table>

	<!-- 分页功能 -->
	<nav class="text-right">
		<ul class="pagination" id='nav_page_comment'>
		</ul>
   </nav>
</section>

<script type="text/template" id="comment_report_listTemplate">
{{ #list }}
	<tr id='{{ reported_userid }}'>
		<td rowspan='{{ reported_count }}'>{{ reported_usernick }}({{ count }})</td>
	{{ #reported_content }}
	<td class="td_line">{{ content }}({{ count }})</td>
	<td></td>
	<td></td>
	<td></td>				
	<td><button class="btn btn-primary JS_BTN_DETAIL">查看详情</button></td>
	</tr>
	<tr id='{{ id }}' data-userid = '{{ reported_userid }}'>
	{{ /reported_content }}
	</tr>
	{{ /list }}
</script>

<script type="text/template" id="detail_template">
{{ #d }}
<tr id='{{ id }}'>
<td></td>
<td></td>
<td>{{ reason }}</td>
<td>{{ ctime }}</td>
<td>{{ report_usernick }}</td>
<td>{{ state }}</td>
</tr>
{{ /d }}
</script>	
<section class="u_main JS_tab_Content" style="display:none;">
	<!-- 功能面板 -->
	<div>
		<button class="btn btn-info" id='add_report_reason'>添加举报原因</button>
	</div>
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>举报原因</th>
				<th>创建者</th>
				<th>创建时间</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody id='report_reason_list'>
		</tbody>
	</table>
</section>
<script type="text/template" id="reason_listTemplate">
	<tr id='{id}'>
		<td>{reason}</td>
		<td></td>
		<td></td>		
		<td>
			<button class="btn btn-primary JS_BTN_DELETEREASON">删除</button>
		</td>
	</tr>			      
</script>

<div class="modal fade" id="report_add_modal" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">添加举报原因</h4>
			</div>
			<div class="modal-body">
				<input id="reasonaddInput" type="text" placeholder="请输入举报原因" class="form-control">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
				<button type="button" class="btn btn-primary" id='btn_report_add'>提交</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="/static/js/pages/report.bak.js"></script>
<?php echo $footer; ?>