require.config({
	baseUrl:'/static/js',
	paths: {
		APP : 'app',		
		jQuery : 'libs/jquery.min',
		MD5    : 'libs/md5',
		Bootstrap : 'libs/bootstrap',
		DatePicker: 'libs/bootstrap-datepicker',
		DateTimePicker: 'libs/datetimepicker/bootstrap-datetimepicker.min',
		wangEditor : 'libs/wangEditor-1.3.12',  //插件有所修改，不要切换为min.
		Mustache : 'libs/mustache',
		Particles : 'libs/particles.min',
		angular : 'libs/angular/angular.min',
		sortable: 'libs/jquery.sortable'

	},

	shim : {
		Bootstrap : {
			deps : ['jQuery'],
			exports : 'Bootstrap'
		},
		DatePicker: {
			deps : ['Bootstrap'],
			exports : 'DatePicker'
		},
		DateTimePicker: {
			deps : ['Bootstrap'],
			exports : 'DateTimePicker'
		},	
		Mustache : {
			deps : ['jQuery'],
			exports : 'Mustache'
		},
		angular : {
			"exports" : "angular"
		},		
	}
});