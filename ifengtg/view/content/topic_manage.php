<!-- 账号管理 -->
<?php
	echo $header;
	echo $nav;
 ?>


<section class="u_main u_user" id="topic_manage">

	<!-- 功能面板 -->
	<div class="mb10" ng-controller="TabChange" id="topic_type_choice">
		<strong class="font2 ml30 mr20">
			分类
		</strong>

		<!-- 各个列表切换按钮 -->
		<button ng-class="{'active':item.show}" class="btn btn-warning ml5" ng-repeat="item in tabs" ng-click="change($index , item)">
			{{item.name}}
		</button>
	</div>

	<!-- 搜索功能区域 -->
	<div class="mb10" ng-controller="SearchData" ng-show="tabContent.index || tabContent.square">
		<strong class="font2 ml30 mr20">
			搜索
		</strong>
		<button class="btn u_btn">
			时间范围
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<form class="inline-block" ng-submit="goSearch()">
			<input id="searchTimeBegin" class="JS_date form-control inline-block w100" type="text" ng-model="data.beginTime" placeholder="开始时间">
			<input id="searchTimeEnd" class="JS_date form-control inline-block w100" type="text" ng-model="data.endTime" placeholder="结束时间">

			<select ng-model="data.tag" class="form-control inline-block w150" id="tages">
				<option value="">标签筛选</option>
				<option ng-repeat="item in tags" value="{{item.name}}">{{item.name}}</option>
			</select>

			<input class="form-control inline-block w200 JS_inputcontent" type="text" ng-model="data.content" placeholder="话题名称或内容搜索">

			<button class="btn btn-primary">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				<strong>搜索</strong>
			</button>
		</form>
	</div>

	<!-- banner -->
	<div class="mb10" ng-controller="BannerPlay" ng-show="tabContent.banner" ng-cloak>
		<strong class="font2 ml30 mr20">
			轮播属性
		</strong>
		<form class="inline-block" ng-submit="saveBannerPlay()">

			<input class="form-control inline-block w60 " type="text" ng-model="bannerplayset.num" placeholder="轮播个数">
			<input class="form-control inline-block w60 " type="text" ng-model="bannerplayset.space" placeholder="轮播间隔">

			<button class="btn btn-primary">
				<span class="glyphicon glyphicon-floppy-saved" aria-hidden="true"></span>
				<strong>保存</strong>
			</button>
		</form>
	</div>

	<div>
		<strong class="font2 ml30 mr20">
			其它
		</strong>
		<a target="_blank" href="/index/topicNormal" class="btn btn-success">
			话题添加New
		</a>
		<a target="_blank" href="/index/topicH5" class="btn btn-success">
			H5添加New
		</a>
		<a target="_blank" href="/index/topicVideo" class="btn btn-success">
			视频添加New
		</a>
		<a target="_blank" href="/index/topicLive" class="btn btn-success">
			直播添加New
		</a>
		<a target="_blank" href="/index/topicActive" class="btn btn-success">
			活动添加New
		</a>
		<a target="_blank" href="/index/justVideo" class="btn btn-success">
			只是视频
		</a>
	</div>

	<!-- =============官方用户话题数据 ==============-->
	<div class="JS_tab_Content" ng-controller="DataList">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th class="w60">ID</th>
					<th class="w200">标题</th>
					<th class="w100">封面</th>
					<th class="w150">发布时间</th>
					<!-- <th class="w100">赞人数</th>
					<th class="w100">评论数</th> -->
					<th class="w60">类型</th>
					<th class="w100">标签</th>
					<th class="w150">发布者</th>
					<th class="w100">详情查看</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<!-- 首页话题展示 -->
				<tr ng-repeat="item in showlist">
					<td>{{item.id}}</td>
					<td class="list_strong">
						<!-- <strong ng-class='{"btn-success" : item.bstatus==2}'>
								{{item.title}}
							</strong> -->
						{{item.title}}
					</td>
					<td>
						<img ng-if="!tabContent.square" ng-src="{{item.cover_pic | cover_pic}}" alt="封面图">
					</td>
					<td ng-class="{'u_yellow' : DateE < item.publishtime}">{{item.publishtime | toTime}}</td>
					<!-- <td ng-="item.publishtime==1" class="red">{{item.publishtime | toTime}}</td> -->
					<!-- <td>{{item.praise_count}}</td>
					<td>{{item.comment_count}}</td> -->
					<td class="list_strong">
						<strong ng-if="item.contenttype==1" class="btn-default">
							话题
						</strong>
						<strong ng-if="item.contenttype==3" class="btn-primary">
							视频
						</strong>
						<strong ng-if="item.contenttype==4" class="btn-success">
							直播
						</strong>
						<strong ng-if="item.contenttype==5" class="btn-info">
							H5
						</strong>
						<strong ng-if="item.contenttype==6" class="btn-danger">
							人物
						</strong>
					</td>
					<td>{{item.tag}}</td>
					<td class="user_head">
						<img ng-src="{{item.head | headPic}}" alt="">{{item.nick}}
					</td>
					<td>
						<button ng-click="goDetail(item)" class="btn btn-primary">
							话题编辑
						</button>
					</td>
					<td class="list_option">
						<!-- 首页话题操作 -->
						<div ng-if="tabContent.index">
							<button ng-click="goUp($index , item)" class="btn btn-default JS_sort" data-type="up">
								<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
							</button>
							<button ng-click="goDown($index , item)" class="btn btn-default JS_sort" data-type="down">
								<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
							</button>
							<button ng-click="toTop($index , item)" class="btn btn-default">
								置顶
							</button>
							<button ng-click="toBanner($index , item.id)" class="btn btn-success">
								Banner
							</button>
							<button ng-click="toPermanent($index , item.id)" class="btn btn-success">
								固定位置
							</button>
							<button ng-click="deleteFn($index , item)" class="btn btn-danger">
								删除
							</button>
						</div>
						<!-- 广场话题操作 -->
						<div ng-if="tabContent.square">
							<button ng-click="hideTopic($index , item.id)" class="btn btn-warning">
								隐藏话题
							</button>
							<button ng-click="squreRecommend( $index , item.id )" class="btn btn-success">
								推荐
							</button>
							<button ng-click="deleteFn($index , item)" class="btn btn-danger">
								删除
							</button>
						</div>
						<!-- 推荐话题操作-->
						<div ng-if="tabContent.recommend">
							<button ng-click="cancelRecommend($index , item.id)" class="btn btn-danger">
								取消推荐
							</button>
						</div>
						<!-- Banner话题操作 -->
						<div ng-if="tabContent.banner">
							<button ng-click="editorBannerfn($index , item.id)" ng-if="item.bstatus==1" class="btn btn-primary">
								编辑在线
							</button>
							<button ng-click="editorBannerfn($index , item.id)" ng-if="item.bstatus==2"  class="btn btn-default">
								设为上线
							</button>
							<button ng-click="editorRecover($index , item.id)" class="btn btn-danger">
								恢复
							<!-- <button ng-click="editorRecover($index , item.id)" class="btn btn-danger">
								恢复 -->
							</button>
						</div>
						<!-- 固定位置操作 -->
						<div ng-if="tabContent.direct">
							<button ng-click="editorDirect($index , item.id)" ng-if="item.adstatus==1" class="btn btn-primary">
								编辑在线
							</button>
							<button ng-click="editorDirect($index , item.id)" ng-if="item.adstatus==2"  class="btn btn-default">
								设为上线
							</button>
							<button ng-click="DirectRecover($index , item.id)" class="btn btn-danger">
								恢复
							</button>
						</div>

						<!-- 待发布操作 -->
						<div ng-if="tabContent.unpublished">
							<button ng-click="toBanner($index , item.id)" class="btn btn-success">
								Banner
							</button>
							<button ng-click="deleteFn($index , item)" class="btn btn-danger">
								删除
							</button>
						</div>
						<!-- 活动操作 -->
						<div ng-if="tabContent.activelist">
							<button ng-click="deleteFn($index , item)" class="btn btn-danger">
								删除
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav ng-controller="page" class="text-right">
			<ul class="pagination">
				<li ng-click="prev()">
					<span aria-label="Previous">
						<span aria-hidden="true">«</span>
					</span>
				</li>

				<li class="active">
					<span>{{currentPage}}</span>
				</li>

				<li ng-click="next()">
					<span aria-label="Next">
						<span aria-hidden="true">»</span>
					</span>
				</li>
				<li>
					&nbsp;&nbsp;
					总共 {{pages}} 页
					<form class="inline-block" ng-submit="pageGo()">
						<input ng-model="pageNumber" type="text" class="form-control inline-block w60" placeholder="页码">
						<button class="btn btn-default">
							<strong>GO</strong>
						</button>
					</form>
				</li>
			</ul>
	   </nav>
	</div>

</section>

<!-- 标签添加模态框 modal-sm-->
<div class="modal fade" id="BannerModel" ng-controller="bannerEditor" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Banner属性编辑</h4>
			</div>
			<div class="modal-body navbar-form">
				<div class="mb10">
					<label>展示列表</label>
					<select ng-model="data.liststyle" class="form-control w150">
						<option value="2">隐藏用户名</option>
						<option value="3">视频</option>
						<option value="4">直播</option>
					</select>
				</div>
				<div class="mb10">
					<label>排序权重</label>
					<input ng-model="data.weight" type="text" class="form-control w150">
				</div>
				<div class="mb10">
					<label>
						结束时间
						<em class="font0">(小于等于当前时间都为过期)</em>
					</label>
					<input style="margin-left:60px;" id="dateTime" ng-model="data.endtime" type="text" class="form-control w150">
				</div>
			</div>
			<div class="modal-footer">
				<button ng-click="save()" type="button" class="btn btn-primary">save</button>
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- 广告发布信息编辑  -->
<div class="modal fade" id="directModal" ng-controller="directEditor" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content" id="adInfo">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">固定位置编辑</h4>
			</div>
			<div class="modal-body u_target_adset">
				<div class="navbar-form">
					<span>起始位置:</span>
					<input type="text" ng-model="data.start" placeholder="默认为1" name="start" class="form-control w160i">
				</div>
				<div class="navbar-form">
					<span>步进长度:</span>
					<input type="text" ng-model="data.step" placeholder="默认为1" name="step" class="form-control w160i">
				</div>
				<div class="navbar-form">
					<span>数量:</span>
					<input type="text" ng-model="data.num" placeholder="默认为0" name="num" class="form-control w160i">
				</div>
				<div class="navbar-form">
					<span>权重:</span>
					<input type="text" ng-model="data.weight" placeholder="默认为1" name="weight" class="form-control w160i">
				</div>
				<div class="navbar-form">
					<span>结束时间:</span>
					<input type="text" id="dateTime2" ng-model="data.endtime" placeholder="必须" name="endtime" id="adTimePick" class="form-control w160i">
				</div>
				<div class="navbar-form">
					<span>展示位置:</span>
					<select ng-model="data.recommend" name="recommend" class="form-control w160i">
						<option value="2">首页</option>
						<option value="0">广场</option>
					</select>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" ng-click="save()" class="btn btn-primary">添加</button>
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- 话题恢复重置封面图  -->
<div class="modal fade" id="BannerRecoverModel" ng-controller="bannerEditor" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-sm">
		<div class="modal-content" id="adInfo">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">固定位置编辑</h4>
			</div>
			<div class="modal-body u_target_adset">
				<div class="navbar-form">
					<span>起始位置:</span>
					<input type="text" ng-model="data.start" placeholder="默认为1" name="start" class="form-control w160i">
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" ng-click="save()" class="btn btn-primary">添加</button>
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>



<script src="/static/js/pages/content/manage_content.js"></script>
<?php echo $footer; ?>