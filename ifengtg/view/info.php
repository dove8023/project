<!-- 账号管理 -->
<?php echo $header;echo $nav; ?>

<div ng-controller="Box">
	<aside class="u_aside">
		<ul class="list-unstyled pt10">
			<li class="mb10">			
				<button ng-class="{'btn-info':sendInfo}" ng-click="tabChange('sendInfo')" class="btn btn-default btn-md btn-block btn-info">
					发送系统消息
				</button>
			</li>
			<li class="mb10">			
				<button ng-class="{'btn-info':list}" ng-click="tabChange('list')" class="btn btn-default btn-md btn-block">
					待发布消息查看
				</button>
			</li>		
		</ul>
	</aside>


	<section class="u_main" ng-show="sendInfo">		
			<h1 class="font5">
				<strong>系统消息发送</strong>
			</h1>
			<form id="formE" class="navbar-form u_info_form">		
				<!-- 有就显示 -->
				<div class="mb20">
					<span class="u_litter_title">推送平台:</span>
					<div class="u_info_box" id="twitter_platform">
						<label class="font1">
							<input type="radio" checked="true" data-type="Android" name="targetOS" value="1">Android
						</label>
						<label class="font1">
							<input type="radio" data-type="IOS" name="targetOS" value="2">IOS
						</label>
						<label class="font1">
							<input type="radio" data-type="Both" name="targetOS" value="3">Both
						</label>
					</div>	

					<div class="mb20" id="twitter_type" style="display:block;">
						<!-- <span class="u_litter_title"></span> -->
						<div class="u_info_box">
							Android类型:
							<label>
								<input type="radio" name="type" checked="true" value="1"> 通知
							</label>
							<label>
								<input type="radio" name="type" value="2"> 消息
							</label>
						</div>				
					</div>
					<!--<div class="mb20" id="tipVoice" style="display:none;">
						<div class="u_info_box navbar-form">
							<label>
								IOS 消息提示声音: <input type="text" class="form-control" placeholder="请输入消息提示音" name="iosSound">
							</label>
							<label>
								IOS 角标数字: <input type="text" class="form-control" placeholder="请输入角标数字" name="iosBadge">
							</label>
						</div>				
					</div>-->



					<div class="u_info_box JS_tab_Content" id="twitter_type_choice">
						<span class="u_info_twitterType" data-platform="Android" id="twitter_platform_txt">Android</span> : 				
						<label>
							<input type="radio" checked="true" name="twitter_obj" value="0"> 广播(所有人)
						</label>
						<label>
							<input type="radio" name="twitter_obj" value="1" data-tip='{ "tip" : "请输入设备标签(多个设备标签之间用 , 分隔)" , "name" : "tag" , "value" : "" }'> 设备标签(Tag)
						</label>
						<label>
							<input type="radio" name="twitter_obj" value="2" data-tip='{ "tip" : "请输入版本号(多个版本之间用 , 分隔)" , "name" : "version" }'> 版本号
						</label>				
						<label>
							<input type="radio" name="twitter_obj" value="3" data-tip='{ "tip" : "请输入单个设备(多个设备之间用 , 分隔)" , "name" : "device" }'> 单个设备
						</label>
						<label>
							<input type="radio" name="twitter_obj" value="4" data-tip='{ "tip" : "请输入版本白名单" , "name" : "versionwhitename" }'> 版本白名单
						</label>
						<label>
							<input type="radio" name="twitter_obj" value="5" data-tip='{ "tip" : "请输入版本黑名单" , "name" : "versionblackname" }'> 版本黑名单
						</label>
						<div class="u_info_twitter_other" style="display:none;">
							<input type="text" placeholder="你说" id="twitter_type_input" class="form-control w300i">
							<!-- 选择条件 -->
							<input type="text" name="condition" placeholder="请输入and或者or,默认为or" class="form-control w200">
						</div>
					</div>			
				</div>


				<div class="mb20">
					<span class="u_litter_title">推送内容:</span>
					<div class="u_info_box">
						<textarea name="content" class="form-control u_info_textarea" placeholder="请输入推送类容"></textarea>
					</div>			
						
				</div>
				<div class="mb20">
					<span class="u_litter_title">发送时间:</span>
					<div class="u_info_box">
						<label class="JS_tab_main2" data-number="0">
							<input type="radio" checked="true" name="sendtime" value='1'> 立即
						</label>
						<label class="JS_tab_main2" data-number="1">
							<input type="radio" name="sendtime" value='2'> 定时
						</label>
						<div class="JS_tab_Content2"></div>
						<div class="u_info_detail mt10 JS_tab_Content2" style="display:none;">
							<input class="form-control inline-block w200" id="dateTimePicker" type="text" placeholder="请选择日期时间" name='sendTimeStr'>
						</div>				
					</div>				
				</div>
								
				<div class="mb20" id="otherAdd">
					<span class="u_litter_title">附加字段:</span>
					<div class="u_info_box">				
						<label>
							<input type="radio" checked="true" data-type="otherLink" name='message_type' value='1'> 话题/活动/广告
						</label>				
						<div class="u_info_detail" id="adsAddContent" style="display:block;">
							<label>
								<span class="btn btn-default btn-info JS_tab_main3" data-number="0">	
									<input type="radio" data-type="otherLink" checked="true" name="sub_messagetype" value='1'> 详情				
								</span>
							</label>
							<label>
								<span class="btn btn-default JS_tab_main3" data-number="1">
									<input type="radio" data-type="otherLink" name="sub_messagetype" value='2'> 链接地址
								</span>
							</label>
							<div class="navbar-form JS_tab_Content3" style="display:block;">
								详情 : <input type="number" placeholder="请输入话题ID" class="form-control w300i" name='topic_id'>
							</div>
							<div class="navbar-form JS_tab_Content3" style="display:none;">
								URL  : <input type="url" class="form-control w300i" placeholder="输入一个url" name='detail_url'>
							</div>
						</div>									
					</div>
					<!--<div class="u_info_box">				
						<label>
							<input type="radio" name='message_type' value='2'> 唤醒
						</label>
					</div>
					<div class="u_info_box">				
						<label>
							<input type="radio" name='message_type' value='3'> 消息
						</label>
					</div>-->
				</div>
				
				<div>					
					<button type="submit" class="mr10 pull-right btn btn-primary btn-lg" id="save">保存</button>
				</div>		
			</form>
	</section>


	<section class="u_main" ng-show="list" ng-cloak>
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>序号</th>
					<th>内容</th>
					<th>发布时间</th>
					<th>创建人</th>					
					<th>删除</th>
				</tr>
			</thead>
			<tbody>			
				<tr ng-repeat="item in ListData">
					<td>
						<strong>{{$index+1}}</strong>
					</td>					
					<td>
						{{item.content}}
					</td>
					<td>
						{{item.sendTime}}
					</td>
					<td>
						{{item.creator}}
					</td>			
					<td>
						<button ng-click="delet(item)" class="btn btn-danger">删除</button>
					</td>
				</tr>

			</tbody>
		</table>
		<button class="btn btn-success" ng-if="!ListData.length">无数据</button>
	</section>
</div>
	













	


<div class="modal fade" id="userChoice" role="dialog" aria-labelledby="mySmallModalLabel" ng-controller="UserList">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">推送用户选择</h4>
			</div>
			<div class="modal-body">
				<ul class="list-unstyled info_user_choice">
					<li ng-repeat="item in list">
						<label>
							<input ng-model="item.ShowHere" ng-click="checkboxGo(item)" type="checkbox">
							<span>{{item.nick | nothing}}</span>
							<em>{{item.ctime | toTime}}</em>	
						</label>
					</li>					
				</ul>
				<paging loader="getUsers(nowpage)" ng-show="list.length" everynum="{{EveryPage}}" ng-count="{{count}}"></paging>

				<h4>
					已选择(点击取消) <button ng-click="ClearAll()" class="btn btn-success">清空</button>
				</h4>
				<div class="info_user_choice_box">
					<span class="btn btn-default" ng-click="choiceDelet(item)" ng-repeat="item in Choiced">{{item.nick | nothing}}</span>	
				</div>
			</div>
			<div class="modal-footer">				
				<button type="button" ng-click="saveChoice()" class="btn btn-primary">Save changes</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->










<script src="/static/js/pages/info.js"></script>
<?php echo $footer; ?>