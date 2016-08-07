requirejs.config({
    paths: {
        jquery : 'lib/jquery-3.1.0.min',
        template : 'lib/template-3.0.3.min'
    },
    shim: {
        jquery: {
        	exports:'$'
        },
        template: {
        	deps:['jquery']
        }
    },
    baseUrl:'./'
});
/*
easy-chat core 
*/
requirejs(['jquery','template'], function ($,Tpl) {
	console.log('requirejs test,'+JSON.stringify($('#tpl-one').html()));

	var data = {title: 'this is arttemplate test.'};
	var _html = Tpl('tpl-one',data);
	$('#demo').html(_html);
});