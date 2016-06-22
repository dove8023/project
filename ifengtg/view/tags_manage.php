<!-- 账号管理 -->
<?php echo $header;echo $nav; ?>

<aside class="u_aside">
	<ul class="list-unstyled pt10">
		<li class="mb10">
			<button class="btn btn-default btn-info btn-md btn-block JS_tab_main" data-number="0">
				标签列表
				<span id="count" class="badge"></span>
			</button>
		</li>
		<li class="mb10">
			<button class="btn btn-default btn-md btn-block JS_tab_main" data-number="1">
				热门标签设置				
			</button>
		</li>
		<li class="mb10">
			<button class="btn btn-default btn-md btn-block JS_tab_main" data-number="2">
				热搜词设置				
			</button>
		</li>		
	</ul>
</aside>


<!-- 页面主要功能区 table 切换主元素 -->

<section class="u_main JS_tab_Content">
	<!-- 功能面板 -->
	<div>
		<h3>
			<strong>
				标签列表
			</strong>
		</h3>

		<button id="addTagBtn" class="btn btn-success btn-md">添加标签</button>
	</div>
	
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>选择</th>
				<th>ID</th>
				<th>标签名称</th>
				<th>创建时间</th>
				<th>操作管理员</th>
				<th>话题总数</th>
				<th>删除</th>
			</tr>
		</thead>
		<tbody id="tagList">
			<script type="text/template" id="listTemplate">
				<tr draggable="true" id="{tagid}">
					<td><input type="checkbox"></td>
					<th scope="row">{tagid}</th>
					<td><button class="btn btn-info JS_tag_editor">{name}</button></td>
					<td>{ctime}</td>
					<td>
						{creator}
					</td>
					<td>
						<button class="btn btn-default disabled">{topic_num}</button>
					</td>			
					<td>
						<button class="btn btn-danger JS_tag_delete">删除</button>
					</td>
				</tr>	
			</script>			
		</tbody>
	</table>	
</section>

<!-- 热门标签设置 -->
<section class="u_main JS_tab_Content" style="display: none;">
	
	<h3>
		<strong>
			热门标签设置
		</strong>
	</h3>
	
	<div class="tag_main" ng-controller="HotTags">
		
		<div class="tag_box fl">
			<h5>
				上一小时(次数)
			</h5>
			<ul class="list-unstyled JS_tag" id="TagHour">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in oneHour">
					<button data-str="{{key}}" class="btn btn-default btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>							
			</ul>				
		</div>



		<div class="tag_box fl">
			<h5>
				昨天
			</h5>
			<ul class="list-unstyled JS_tag" id="TagLastday">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in lastDay">
					<button data-str="{{key}}" class="btn btn-info btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>				
			</ul>
		</div>

		<div class="tag_box fl">
			<h5>
				前7天
			</h5>
			<ul class="list-unstyled JS_tag" id="TagSevenDay">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in sevenDay">
					<button data-str="{{key}}" class="btn btn-success btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>				
			</ul>
		</div>


		<div class="tag_box fr" style="background-color: #fff;">
			<h5>
				推荐热搜词
			</h5>
			<button save-tag savego="saveTag(arr)" class="btn btn-primary btn-block mb20">
				保存
			</button>
			<ul class="list-unstyled JS_tag" id="TagRecommend">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="item in recommend">
					<button data-str="{{item}}" class="btn btn-danger btn-block">
						{{item}}
					</button>
				</li>				
			</ul>
		</div>
	</div>



</section>


<!-- 热搜词设置 -->
<section class="u_main JS_tab_Content" style="display: none;">
	
	<h3>
		<strong>
			热搜词设置
		</strong>
	</h3>
	
	<div class="tag_main" ng-controller="HotSearch">
		
		<div class="tag_box fl">
			<h5>
				上一小时(次数)
			</h5>
			<ul class="list-unstyled JS_tag" id="SearchHour">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in oneHour">
					<button data-str="{{key}}" class="btn btn-default btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>							
			</ul>				
		</div>

		<div class="tag_box fl">
			<h5>
				昨天
			</h5>
			<ul class="list-unstyled JS_tag" id="SearchLastday">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in lastDay">
					<button data-str="{{key}}" class="btn btn-info btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>				
			</ul>
		</div>

		<div class="tag_box fl">
			<h5>
				前7天
			</h5>
			<ul class="list-unstyled JS_tag" id="SearchSevenDay">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="(key , value) in sevenDay">
					<button data-str="{{key}}" class="btn btn-success btn-block">
						{{key}}
						<span class="badge">{{value}}</span>
					</button>
				</li>				
			</ul>
		</div>

		<div class="tag_box fr" style="background-color: #fff;">
			<h5>
				推荐热搜词
			</h5>
			<button save-tag savego="saveTag(arr)" class="btn btn-primary btn-block mb20">
				保存
			</button>
			<ul class="list-unstyled JS_tag" id="SearchRecommend">
				<li>
					<button class="btn btn-black btn-block disabled">
						占位勿动
					</button>
				</li>
				<li ng-repeat="item in recommend">
					<button data-str="{{item}}" class="btn btn-danger btn-block">
						{{item}}
					</button>
				</li>				
			</ul>
		</div>
	</div>
</section>


<!-- 添加标签模态框 -->
<div class="modal fade" id="tagModal" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">
					<strong>添加标签</strong>
				</h4>
			</div>
			<div class="modal-body">
				<input id="addInput" type="text" placeholder="请输入标签名" class="form-control">
			</div>
			<div class="modal-footer">				
				<button id="addSend" type="button" class="btn btn-primary">提交</button>
				<button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- 修改标签模态框 -->
<div class="modal fade" id="tagModal2" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">
					<strong>修改标签</strong>
				</h4>
			</div>
			<div class="modal-body">
				<input id="editorInput" type="text" placeholder="请输入标签名" class="form-control">
			</div>
			<div class="modal-footer">				
				<button id="editorSend" type="button" class="btn btn-primary">保存</button>
				<button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="/static/js/pages/tags.js"></script>
<?php echo $footer; ?>