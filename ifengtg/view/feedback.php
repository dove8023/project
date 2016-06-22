<!-- 反馈管理 -->
<?php echo $header;echo $nav; ?>

<aside class="u_aside">
	<ul class="list-unstyled pt10">
		<li class="mb10">
			<button class="btn btn-info btn-md btn-block JS_tab_main" data-number="0">
				反馈列表
				<span class="badge" id='feedback_count'></span>
			</button>
		</li>
	</ul>
</aside>


<!-- 页面主要功能区 table 切换主元素 -->

<section class="u_main JS_tab_Content">
	<!-- 功能面板 -->
	<div>
		<button class="btn u_btn">
			设备选择
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<select class="form-control w100 inline-block mr30" name="device_select" id="device_select">
			<option value="">选择</option>
			<option value="ios">ios</option>
			<option value="android">android</option>
		</select>
		<button class="btn u_btn">
			时间范围
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<input class="JS_date form-control inline-block w100" type="text" placeholder="开始时间" id='start_time'>
		<input class="JS_date form-control inline-block w100" type="text" placeholder="结束时间" id='end_time'>

		<button class="btn btn-info" id="btn_search">
			<strong>搜索</strong>
		</button>
		<button class="btn btn-info" id="btn_export">
			<strong>导出</strong>
		</button>
	</div>
	
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>昵称</th>
				<th>内容</th>
				<th>时间</th>
				<th>设备号</th>
				<th>系统版本</th>
				<th>APP版本</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody id='feedback_list'>
		</tbody>
	</table>

	<!-- 分页功能 -->
	<nav class="text-right">
		<ul id="feedback_paging" class="pagination" data-current="1">
		</ul>
	</nav>
</section>

<script type="text/template" id="feedback_listTemplate">
	<tr id='{feedbackid}'>
		<td>{nick}</td>
		<td class="td_line">{content}</td>
		<td>{ctime}</td>
		<td>{deviceid}</td>
		<td>{deviceinfo}</td>				
		<td>{appversion}</td>
		<td>
			<button class="btn btn-primary Js_Btn_DeleteFeedback">删除</button>
		</td>
	</tr>
</script>

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










<script src="/static/js/pages/feedback.js"></script>
<?php echo $footer; ?>