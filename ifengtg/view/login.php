<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>时尚后台</title>	
	<link rel="stylesheet" href="/static/css/app.css">
	<link rel="stylesheet" href="/static/css/bootstrap.css">
	<link rel="stylesheet" href="/static/css/base.css">
	<link rel="stylesheet" href="/static/css/user.css">
	<script src="/static/js/libs/require.js"></script>
	<script src="/static/js/common.js"></script>
	<style>
		html,body{
			height: 100%;
			overflow: hidden;
		}
		:root{
			background-color: #2472b4;
		}
		#particles-js{
			height: 100%;
		}
	</style>

</head>
<body>


	<div id="particles-js"></div>
	<form class="logo_page form-horizontal" id='login_from'>
		<h2 class="text-center font5">
			<strong>时尚管理员登录</strong>
		</h2>		
		
		<div class="input-group">
			<span class="input-group-addon">
				<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
			</span>
			<input type="text" class="form-control" placeholder="请输入用户名" id="name">
		</div>
	
		<div class="input-group">
			<span class="input-group-addon">
				<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
			</span>
			<input type="password" class="form-control" placeholder="请输入密码" id="password">
		</div>

		<div class="input-group login_checkcode" id="imgCheckBox" style="display:none;">
			<span class="input-group-addon">
				<span class="glyphicon glyphicon glyphicon-leaf" aria-hidden="true"></span>
			</span>
			<div>
				<img id="ImgCheckCode" class="fr" src="https://id.ifeng.com/public/authcode?" alt="验证码">
				<input type="text" class="fl" placeholder="验证码" id="password">
			</div>			
		</div>
	
		
		<div>
			<button class="btn btn-info u_logosubmit" id="btn_commit">
				提交
			</button>
		</div>					
	</form>

<script src="/static/js/pages/login.js"></script>
<?php echo $footer; ?>