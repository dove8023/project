<!-- 首页 -->
<?php echo $header;echo $nav; ?>

<aside class="u_aside" ng-controller="TipType">
	<ul class="list-unstyled pt10">
		<li class="mb10" ng-repeat="item in tipTypeList">
			<button ng-class="{ 'btn-info' : item.show }" class="btn btn-default btn-md btn-block" ng-click="tipTypeChange(item)">
				{{item.name}}
			</button>
		</li>
	</ul>
</aside>


<!-- 页面主要功能区 table 切换主元素 -->

<section class="u_main" ng-controller="TipList">
	<button ng-click="addItem()" class="btn btn-success">
		添加{{CurrentType.name}}
	</button>
	<!-- 数据展示 -->
	<table class="table u_table table-hover">
		<thead>
			<tr>
				<th>序号</th>
				<th class="w300">提示语内容</th>
				<th>上次操作时间</th>
				<th>操作人</th>
				<th>设为默认</th>
				<th>删除</th>				
			</tr>
		</thead>
		<tbody>			
			<tr ng-repeat="item in List">
				<td>
					<strong>{{$index+1}}</strong>
				</td>
				<td>
					<button class="btn btn-default tip_content" ng-click="changeContent(item)">
						{{item.content}}
					</button>
				</td>
				<td>
					{{item.ctime}}
				</td>
				<td>
					{{item.creator}}
				</td>
				<td>
					<button ng-class="{'btn-primary' : item.default == 1 , 'disabled' : item.default == 1}" ng-click="setDefault(item)" class="btn btn-default">
						设为默认
					</button>
				</td>
				<td>
					<button ng-if="item.default != 1" ng-click="delet($index , item)" class="btn btn-danger">
						删除
					</button>
				</td>
			</tr>					     
		</tbody>
	</table>

	<!-- 提示语修改 -->
	<div class="modal fade" id="tipChange" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">{{CurrentType.name}}&nbsp;修改</h4>
				</div>
				<div class="modal-body">
					<input type="text" ng-model="changeData.content" class="form-control mb10">
					<p>
						<label class="tip_text">
							<input ng-model="changeData.default2" type="checkbox">
							&nbsp;设置为默认
						</label>
					</p>						
				</div>
				<div class="modal-footer">				
					<button ng-click="contentSave()" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!-- 提示语修改 -->
	<div class="modal fade" id="tipAdd" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">{{CurrentType.name}}&nbsp;添加</h4>
				</div>
				<div class="modal-body">
					<input type="text" ng-model="addData.content" placeholder="输入添加提示语" class="form-control mb10">
					<p>
						<label class="tip_text">
							<input ng-model="addData.default2" type="checkbox">
							&nbsp;设置为默认
						</label>
					</p>
				</div>
				<div class="modal-footer">
					<button ng-click="addSave()" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</section>


<section id="test" class="u_main" ng-controller="Test">
	测试
	<!-- <button id="one" ondragstart="drag(event)" ondragover="allow(event)" ondrop="drop(event)" draggable="true" class="btn btn-default">one</button>
	<button id="two" ondragstart="drag(event)" ondragover="allow(event)" ondrop="drop(event)" draggable="true" class="btn btn-default">two</button>
	<button id="three" ondragstart="drag(event)" ondragover="allow(event)" ondrop="drop(event)" draggable="true" class="btn btn-default">three</button>
	<button id="four" ondragstart="drag(event)" ondragover="allow(event)" ondrop="drop(event)" draggable="true" class="btn btn-default">four</button> -->




	<button drag-drop="{{$index}}" id="{{item.name}}" class="btn btn-success mr10" ng-repeat="item in hello" ondragover="allow(event)" ondrop="drop(event)" draggable="true">{{item.name}}</button>
</section>




<script src='/static/js/pages/tip_manage.js'></script>
<?php echo $footer; ?>