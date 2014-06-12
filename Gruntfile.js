/* jshint node:true */
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: 'app',
            tmp: '.tmp',
            dist: 'dist'
        },
        package: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                '<%= path.dist %>/*',
                '<%= path.tmp %>/*',
                '!<%= compass.options.cacheDir %>'
            ],
            server: [
                '<%= path.tmp %>/*',
                '!<%= compass.options.cacheDir %>'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= path.app %>/styles',
                cssDir: '<%= path.tmp %>/styles',
                imagesDir: '<%= path.app %>/images',
                javascriptsDir: '<%= path.app %>/scripts',
                fontsDir: '<%= path.app %>/fonts',
                cacheDir: '<%= path.tmp %>/.sass',
                //relativeAssets: true,
                importPath: [
                    'vendor/bootstrap-sass-official/vendor/assets/stylesheets'
                ]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                }

            },
            server: {
                options: {
                    outputStyle: 'expanded',
                    debugInfo: true
                }
            }
        },
        includereplace: {
            all: {
                options: {
                    globals: grunt.file.readJSON('config/replace.json'),
                    prefix: '<!-- replace:',
                    suffix: ' -->'
                },
                files: [{
                    src: '*.html',
                    dest: '<%= path.tmp %>/',
                    expand: true,
                    cwd: '<%= path.app %>'
                }]

            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*'
            },
            livereload: {
                options: {
                    livereload: true,
                    base: ['<%= path.tmp %>', '<%= path.app %>', '.' ]
                }
            },
            dist: {
                options: {
                    base: '<%= path.dist %>',
                    keepalive: true
                }
            }
        },
        watch: {
            compass: {
                files: ['<%= path.app %>/styles/{,*/}*.scss'],
                tasks: ['compass:server']
            },
            html: {
                files: ['<%= path.app %>/{,**/}*.html'],
                tasks: ['includereplace']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= path.tmp %>/{,**/}*.html',
                    '<%= path.tmp %>/styles/{,*/}*.css',
                    '{<%= path.tmp %>,<%= path.app %>}/scripts/{,*/}*.js',
                    '<%= path.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ]
            }
        },
        useminPrepare: {
            html: '<%= path.tmp %>/index.html',
            options: {
                dest: '<%= path.dist %>/'
            }
        },
        usemin: {
            html: ['<%= path.dist %>/{,*/}*.html'],
            css: ['<%= path.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= path.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.app %>/images',
                    src: '**/*.{png,jpg,gif}',
                    dest: '<%= path.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '.tmp',
                    src: '*.html',
                    dest: '<%= path.dist %>'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            dist: {
                expand: true,
                cwd: '.tmp/styles/',
                src: '*.css',
                dest: '<%= path.dist %>/styles/'
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.app %>',
                    dest: '<%= path.dist %>',
                    src: [
                        'scripts/ie/*.js', // @todo replace with usemin
                        '*.{ico,txt}',
                        'fonts/*',
                        '.htaccess'
                    ]
                }]
            }
        },
        compress: {
            dist: {
                options: {
                    archive: '<%= path.dist %>/<%= package.name %>.zip',
                    pretty: true
                },
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.dist %>/',
                    src: '**',
                    dest: './'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: [
                'Gruntfile.js',
                '<%= path.app %>/scripts/{,*/}*.js'
            ]
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist']);
        }

        grunt.task.run([
            'clean:server',
            'compass:server',
            'includereplace',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'includereplace',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin',
        'compress:dist'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};
