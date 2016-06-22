<!-- 账号管理 -->
<?php 
	echo $header;
	echo $nav;
 ?>
<link rel="stylesheet" href="/static/css/wangEditor-1.3.12.css">

<section class="u_main u_user" id="topic_manage">
	<!-- 功能面板 -->
	<div class="mb10" id="topic_type_choice">
		<strong class="font2 ml30 mr20">
			分类
		</strong>
		<!-- data-type 点击时刷新对应的列表 -->
		<button class="btn btn-warning JS_tab_main" data-number="0" id="official_btn" data-type="2">
			首页话题
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="1" id="normal_btn" data-type="0">
			广场话题
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="2" id="banner_btn" data-type="3">
			banner列表
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="3" id="banner_btn" data-type="1">
			推荐话题列表
		</button>
		<button class="btn btn-warning JS_tab_main" data-number="4" id="banner_btn" data-type="4">
			广告列表
		</button>		
	</div>
	<div class="mb10">
		<strong class="font2 ml30 mr20">
			搜索
		</strong>
		<button class="btn u_btn">
			时间范围
			<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
		</button>
		<input class="JS_date form-control inline-block w100" type="text" placeholder="开始时间">
		<input class="JS_date form-control inline-block w100" type="text" placeholder="结束时间">
		
		<select class="form-control inline-block w150" id="tages">					
		</select>

		<input class="form-control inline-block w200 JS_inputcontent" type="text" placeholder="话题名称或内容搜索">

		<button class="btn btn-primary" id="searchE">
			<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
			<strong>搜索</strong>
		</button>		
	</div>

	<div>
		<strong class="font2 ml30 mr20">
			其它
		</strong>		
		<a target="_blank" href="/index/topicdetail?type=add" class="btn btn-success">
			添加话题
		</a>
		<a target="_blank" href="/index/BannerImg?type=add" class="btn btn-success">
			图文Banner添加
		</a>
		<a target="_blank" href="/index/BannerVideo?type=add" class="btn btn-success">
			视频Banner添加
		</a>
		<a target="_blank" href="/index/ad?type=add" class="btn btn-success">
			广告添加
		</a>
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
	</div>



	<!-- =============官方用户话题数据 ==============-->
	<div class="JS_tab_Content">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th class="w200">标题</th>
					<th class="w150">历史标题</th>
					<th>发布时间</th>
					<th>赞人数</th>
					<th>评论数</th>
					<th class="w150">标签</th>
					<th>发布者</th>	
					<th>编辑</th>
					<th class="w160">排序</th>
					<th>删除</th>
				</tr>
			</thead>
			<script type="text/template" id="listTemplate">
				<tr id="{id}" data-score="{score}">
					<td><input type="checkbox"></td>
					<td>
						{title}
					</td>
					<td>{ext_title}</td>
					<td>{publishtime}</td>
					<td>
						{praise_count}
					</td>
					<td>
						{comment_count}
					</td>
					<td>					
						{tag}
					</td>
					<td class="editer_info">
						<img src="{head}" alt="编辑头像">{nick}
					</td>
					<td>					
						<a target="_blank" href="/index/topicdetail?id={id}&type=editor" class="btn btn-warning">编辑查看</a>
					</td>
					<td>
						<button class="btn btn-default JS_sort" data-type="up">
							<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
						</button>
						<button class="btn btn-default JS_sort" data-type="down">
							<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
						</button>
						<button class="btn btn-default JS_sort" data-type="top">
							置顶
						</button>
					</td>
					<td>
						<button class="btn btn-danger JS_topic_delete">删除</button>
					</td>
				</tr>	
			</script>
			<tbody id="official_list">				     
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right" id="paging1">
			<ul class="pagination" data-current="1">
				
			</ul>
	   </nav>
	</div>
	
	<!-- ===========普通用户话题数据 =========-->
	<div class="JS_tab_Content" style="display:none;">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th class="w200">标题</th>
					<th class="w200">历史标题</th>
					<th>发布时间</th>
					<th>赞人数</th>
					<th>评论数</th>
					<th class="w200">标签</th>
					<th>发布者</th>
					<th>推荐</th>		
					<th>编辑</th>
					<th>删除</th>
				</tr>
			</thead>
			<script type="text/template" id="userlistTemplate">
				<tr id="{id}">
					<td><input type="checkbox"></td>
					<td>
						{title}
					</td>
					<td>{ext_title}</td>
					<td>{publishtime}</td>
					<td>
						{praise_count}
					</td>
					<td>
						{comment_count}
					</td>
					<td>					
						{tag}
					</td>
					<td>
						{nick}
					</td>
					<td>
					<button class="btn btn-success JS_recommend" data-type="add">推荐</button>
					</td>
					<td>					
						<a target="_blank" href="/index/topicdetail?id={id}&type=editor" class="btn btn-warning">编辑查看</a>
					</td>
					<td>
						<button class="btn btn-danger JS_topic_delete">删除</button>
					</td>
				</tr>	
			</script>
			<tbody id="user_list">				     
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right" id="paging2">
			<ul class="pagination">
			</ul>
	   </nav>
	</div>
	
	
	<!-- ============ banner数据展示区 ======= -->
	<div class="JS_tab_Content" style="display:none;">
		<h2>
			banner List.
		</h2>
		<table class="table u_table table-hover u_banner">
			<thead>
				<tr>
					<th>选择</th>
					<th class="w200">标题</th>
					<!-- <th>历史标题</th> -->
					<th>发布时间</th>
					<th class="w200">内容</th>
					<th class="w200">标签</th>
					<!-- <th>发布者</th> -->
					<th>APP显示</th>
					<th>修改时间</th>		
					<th>编辑</th>
					<th>删除</th>
				</tr>
			</thead>
			<script type="text/template" id="bannerlistTemplate">
				<tr id="{id}" data-type="{type}">
					<td><input type="checkbox"></td>
					<td>{title}</td>					
					<td>{ctime}</td>
					<td class="w200">{content}</td>
					<td>{tag}</td>
					<td>
					<button class="btn btn-default JS_banner_app" data-type="normal">设为显示</button>
					</td>
					<td>{mtime}</td>				
					<td>{link}</td>
					<td>
						<button class="btn btn-danger JS_topic_delete">删除</button>
					</td>
				</tr>	
			</script>
			<tbody id="banner_list">				     
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right">
			<ul class="pagination" id="paging3">
			</ul>
	    </nav>
	</div>


	<!-- ===========推荐话题展示区 =========-->
	<div class="JS_tab_Content" style="display:none;">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th class="w200">标题</th>
					<th class="w200">历史标题</th>
					<th>发布时间</th>
					<th>赞人数</th>
					<th>评论数</th>
					<th class="w200">标签</th>
					<th>发布者</th>
					<th>编辑</th>
					<th>取消推荐</th>
				</tr>
			</thead>
			<script type="text/template" id="recommendlistTemplate">
				<tr id="{id}">
					<td><input type="checkbox"></td>
					<td>{title}</td>
					<td>{ext_title}</td>
					<td>{publishtime}</td>
					<td>{praise_count}</td>
					<td>{comment_count}</td>
					<td>{tag}</td>
					<td>{nick}</td>					
					<td>					
						<a target="_blank" href="/index/topicdetail?id={id}&type=editor" class="btn btn-warning">编辑查看</a>
					</td>
					<td><button class="btn btn-danger JS_recommend" data-type="delete">删除</button></td>
				</tr>	
			</script>
			<tbody id="recommend_list">				     
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right">
			<ul class="pagination" id="paging4">
			</ul>
	   </nav>
	</div>

	<!-- ===========  广告展示区  =========-->
	<div class="JS_tab_Content" style="display:none;">
		<table class="table u_table table-hover">
			<thead>
				<tr>
					<th>选择</th>
					<th class="w200">标题</th>
					<th class="w200">历史标题</th>					
					<th>发布时间</th>
					<th>赞人数</th>
					<th>评论数</th>
					<th>发布者</th>
					<th>编辑</th>
					<th class="w100">状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<script type="text/template" id="adlistTemplate">
				<tr id="{id}">
					<td><input type="checkbox"></td>
					<td>{title}</td>
					<td>{ext_title}</td>		
					<td>{publishtime}</td>
					<td>{praise_count}</td>
					<td>{comment_count}</td>
					<td>{nick}</td>					
					<td>					
						<a target="_blank" href="/index/ad?id={id}&type=editor" class="btn btn-warning">编辑查看</a>
					</td>
					<td>{adstatus}</td>
					<td>{adstatus2}</td>
				</tr>	
			</script>
			<tbody id="ad_list">				     
			</tbody>
		</table>

		<!-- 分页功能 -->
		<nav class="text-right">
			<ul class="pagination" id="paging5">
			</ul>
	   </nav>
	</div>
	
</section>



<script src="/static/js/pages/topic.js"></script>

<?php echo $footer; ?>