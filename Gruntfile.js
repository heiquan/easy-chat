module.exports = function(grunt) {
	// 设置grunt
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		date : grunt.template.today("yyyy-mm-dd"),
		jshint : {
			files : [ 'Gruntfile.js','src/js/*' ]
		},
		clean : {
			js : ['dist/js/*'],
			css: ['dist/css/*']
		},
		uglify: {
			options: {
                banner: '/*! <%= pkg.name %> <%= date %> */\n',//添加banner
                report: "min",//输出压缩率，可选的值有 false(不输出信息)，gzip
                mangle: false,//不混淆变量名
                preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer:'\n/*! <%= pkg.name %> 最后修改于： <%= date %> */'//添加footer
            },
            release: {//发布js
                files: {
                    'dist/js/easy-chat-<%= pkg.version %>.min.js': ['src/js/*.js']
                }
            }
		},
		compass: {
			release: {
				options:{
					cssDir: 'dist/css',
					sassDir: 'src/sass',
					outputStyle: 'expanded'
				}
			}
		},
		watch: {
			html:{
                files: ['demo.html'],
                options: {livereload:true}
            },
            css:{
            	files: ['dist/css/*.css'],
            	options: {livereload:true}
            },
            sass:{
            	files: ['src/sass/*.{sass,scss}'],
            	options: {livereload:true},
        		tasks: ['clean:css','compass','cssmin']
            },
            js: {
		        files: ['src/js/*.js'],
		        options: {livereload:true},
		        tasks: ['clean:js','uglify']
		    }
		},
		connect: {
	    	options: {
	        	// 服务器端口号
	        	port: 8080,
	        	// 服务器地址(可以使用主机名localhost，也能使用IP)
	        	hostname: 'localhost',
	        	livereload: 35729
	    	},
	    	livereload: {
	        	options: {
	        		open: true,
	        		// 物理路径(默认为. 即根目录) 
	        		base: ['./']
	        	}	
	    	}
		},
		cssmin: {
			options: {  
	            keepSpecialComments: 0  
	        },
			dist: {
		        files: {
		        	'dist/css/easy-chat-<%= pkg.version %>.min.css':['dist/css/*.css','!dist/css/*.min.css']
		        }
	   		}
		}
	});

	/*grunt.event.on('watch', function(action, filepath, target) {
          grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });*/
	grunt.loadNpmTasks('grunt-contrib-jshint');//js语法检查
	grunt.loadNpmTasks('grunt-contrib-clean');//清理文件夹
	grunt.loadNpmTasks('grunt-contrib-uglify');//压缩合并js
	grunt.loadNpmTasks('grunt-contrib-compass');//sass生成css
	grunt.loadNpmTasks('grunt-contrib-watch');//监控构建
	grunt.loadNpmTasks('grunt-contrib-connect');//web服务器
	grunt.loadNpmTasks('grunt-contrib-cssmin');//压缩css

	grunt.registerTask('default',['jshint','clean','uglify','compass','cssmin']);
	grunt.registerTask('alive',['connect','watch']);
	grunt.registerTask('test1',['uglify']);
	grunt.registerTask('test2',['compass']);
	grunt.registerTask('test3',['clean']);
};
