'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        config: grunt.file.readJSON('config/config.json'),
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['<%= config.path.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= config.path.app %>/*.html',
                    '{.tmp,<%= config.path.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= config.path.app %>}/scripts/{,*/}*.js',
                    '<%= config.path.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= config.path.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.path.app %>/scripts/{,*/}*.js',
                '!<%= config.path.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= config.path.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= config.path.app %>/images',
                javascriptsDir: '<%= config.path.app %>/scripts',
                fontsDir: '<%= config.path.app %>/fonts',
                importPath: 'app/components',
                config: '.compass.rb'
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        useminPrepare: {
            html: '<%= config.path.app %>/index.html',
            options: {
                dest: '<%= config.path.dist %>'
            }
        },
        usemin: {
            html: ['<%= config.path.dist %>/{,*/}*.html'],
            css: ['<%= config.path.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= config.path.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.path.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= config.path.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.path.dist %>/styles/site.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%= config.path.app %>',
                    src: '*.html',
                    dest: '<%= config.path.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.path.app %>',
                    dest: '<%= config.path.dist %>',
                    src: [
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
                    archive: '<%= config.path.dist %>/<%= pkg.name %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.path.dist %>/',
                    src: '**',
                    dest: './'
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= config.path.app %>/scripts/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'compass:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'compass',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
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
        'test',
        'build'
    ]);
};
