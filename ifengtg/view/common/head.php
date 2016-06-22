<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>时尚后台</title>
	<link rel="stylesheet" href="/static/css/app.css">
	<link rel="stylesheet" href="/static/css/bootstrap.css">
	<!-- <link rel="stylesheet" href="static/css/bootstrap-theme.css"> -->
	<link rel="stylesheet" href="/static/css/base.css">
	<link rel="stylesheet" href="/static/css/user.css">
	<link rel="stylesheet" href="/static/css/datepicker.css">
	<link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.css">
	<script src="/static/js/libs/require.min.js"></script>
	<script src="/static/js/common.js"></script>
	<style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-start{clip:rect(0,auto,auto,0);-ms-zoom:1.0001;}.ng-animate-active{clip:rect(-1px,auto,auto,0);-ms-zoom:1;}		
	</style>
</head>
<body>
	<header class="nav box-shadow bg-white navbar-fixed-top-xs u_head">
		<a href="/" class="">
			<img class="mt10f logoJpg" src="/static/images/logo.jpg" alt="logo">
		</a>
		<div class="dropdown pull-right">
			<button class="btn btn-default dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				<img src="<?php if(array_key_exists('nick', $user) && !empty($user['head'])){ echo $user['head'];}else{ echo '/static/images/t.gif';}?>" alt="头像">
				<span><?php if(array_key_exists('nick', $user)) echo $user['nick'];?></span>
				<span class="caret"></span>
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
				<li>
					<!-- ?id=<?php if(array_key_exists('id', $user)) echo $user['id'];?> -->
					<a target="_blank" href="/index/userinfoEditer/#/editerInfo">
						个人中心
					</a>
				</li>
				<li>
					<a href="/login/LoginOut">
						退出
					</a>
				</li>
			</ul>
		</div>
	</header>