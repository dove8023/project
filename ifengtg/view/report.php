<!-- 举报管理 -->
<?php echo $header;echo $nav; ?>

<div ng-controller="TabChange">
	<aside class="u_aside">
		<ul class="list-unstyled pt10">
			<li class="mb10" ng-repeat="item in Tabs" ng-click="showcontent(item)">
				<button class="btn btn-default btn-md btn-block" ng-class='{"btn-info":item.show}'>
					{{item.text}}				
				</button>
			</li>
		</ul>
	</aside>

	<!-- 话题举报列表部分 -->
	<section class="u_main" ng-controller="ReportList" ng-cloak ng-show="Tabs[0].show || Tabs[1].show">
		<button ng-click="showNotAudit()" ng-class="{'btn-primary' : NotAudit}" class="btn btn-default mr20">
			&nbsp;&nbsp;未审核&nbsp;&nbsp;
		</button>
		<button ng-click="showYesAudit()" ng-class="{'btn-primary' : YesAudit}" class="btn btn-default">
			&nbsp;&nbsp;已审核&nbsp;&nbsp;
		</button>
		
		<ul class="list-unstyled mt20 report_list">
			<li class="report_list_li" ng-repeat="item in List">				
				<!-- 被举报用户名 -->
				<p ng-click="ContentShowFn(item)">
					<strong class="fl w60">{{$index+1}}.</strong>
					<strong>
						{{item.reported_usernick}}({{item.count}})
					</strong>					
				</p>
				<!-- 该用户被举报内容列表 -->	
				<ul ng-cloak ng-show="item.contentshow" class="list-unstyled report_content">
					<li class="report_content_li" ng-repeat="item_content in item.reported_content">
						<button ng-click="ContentDetailShow(item_content)" class="btn btn-info btn-sm fr mr30">
							&nbsp;&nbsp;&nbsp;&nbsp;查看&nbsp;&nbsp;&nbsp;&nbsp;
						</button>
						<strong class="fl">{{$index+1}}.</strong>
						<span ng-class="{'report_topic_title' : Type=='topic'}" ng-click="goTopicDetail(item_content)">
							{{item_content.content | ReportCutContent}} <strong>({{item_content.count}})</strong>
						</span>
						<ol ng-cloak ng-show="item_content.contentDetail" class="list-unstyled report_reason_box pt10">
							<li class="report_reason" ng-repeat="item_detail in item_content.arrDetail">
								原因:
								<strong>{{item_detail.reason}}</strong>
								时间:
								<strong>{{item_detail.mtime}}</strong>
								举报人昵称:
								<strong>{{item_detail.report_usernick}}</strong>
								
								<button ng-if="item_detail.status == 1"  ng-click="D_operate(item_content.arrDetail , $index , item_detail , 3);" class="btn fr btn-warning">
									不实
								</button>
								<button ng-if="item_detail.status == 1" ng-click="D_operate(item_content.arrDetail , $index , item_detail , 2);" class="btn fr btn-danger mr10">
									核实
								</button>
								<button ng-if="item_detail.status == 2" class="btn btn-default fr disabled">已核实</button>
								<button ng-if="item_detail.status == 3" class="btn btn-default fr disabled">不实</button>
							</li>
							<button class="btn btn-success" ng-if="!item_content.arrDetail.length">无数据</button>	
						</ol>				
					</li>
										
					<button class="btn btn-success" ng-if="!item.reported_content.length">无数据</button>	
				</ul>
			</li>
			<button ng-cloak class="btn btn-success" ng-if="!List.length">无数据</button>

			<paging loader="getTopicReport(nowpage)" ng-show="List.length" everynum="{{EveryPage}}" ng-count="{{countGet}}"></paging>
		</ul>

	</section>


	<!-- 举报原因管理 -->
	<section ng-controller="ReportReason" class="u_main" ng-cloak ng-show="Tabs[2].show">

		<button class="btn btn-info" ng-click="showAdd()">添加举报原因</button>
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
			<tbody>
				<tr ng-repeat="item in list">
					<td>{{item.reason}}</td>
					<td>无</td>
					<td>无</td>
					<td>
						<button ng-click="delet(item , $index)" class="btn btn-primary">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 举报原因添加模态框 -->
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
						<input ng-model="addreason.content" type="text" placeholder="请输入举报原因" class="form-control">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" ng-click="save()">提交</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>						
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
	</section>	
</div>




<script src="/static/js/pages/report.js"></script>
<?php echo $footer; ?>