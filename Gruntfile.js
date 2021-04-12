module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        compass: {                  // Tas
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'src/scss/',
                    cssDir: 'public/stylesheets',
                    environment: 'development',
					outputStyle: 'compressed'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/javascript/bower_components/**/*', 'src/javascript/lib/**/*']
            },
            src: ['src/javascript/**/*.js']
        },

        requirejs: {
            options: {
                name: 'main',
                baseUrl: 'src/javascript/',
                mainConfigFile: 'src/javascript/app.js',
                out: 'public/javascript/main.js'
            },
            prod: {
                options: {
                	optimize: 'uglify2',
                }
            },
            dev: {
                options: {
                    optimize: 'none',
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                },
            }
        },

		watch: {
			css: {
				files: 'src/scss/**/*.scss',
				tasks: ['compass']
			},
            js: {
                files: ['src/javascript/**/*.js'],
                tasks: ['jshint', 'requirejs:dev']
            }
		},
	});

    grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs:prod', 'compass', 'jshint']);
}
