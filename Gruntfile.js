'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: "app",
            dist: "dist"
        },
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['<%= path.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= path.app %>/*.html',
                    '{.tmp,<%= path.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= path.app %>}/scripts/{,*/}*.js',
                    '<%= path.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
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
            dist: ['.tmp', '<%= path.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= path.app %>/scripts/{,*/}*.js',
                '!<%= path.app %>/scripts/vendor/*',
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
                sassDir: '<%= path.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= path.app %>/images',
                javascriptsDir: '<%= path.app %>/scripts',
                fontsDir: '<%= path.app %>/fonts',
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
            html: '<%= path.app %>/index.html',
            options: {
                dest: '<%= path.dist %>'
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
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= path.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= path.dist %>/styles/site.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        includereplace: {
            dist: {
                options: {
                    globals: grunt.file.readJSON('config/replace.json'),
                    prefix: '<!-- replace:',
                    suffix: ' -->'
                },
                src: '<%= path.app %>/*.html',
                dest: '<%= path.dist %>'
            }
        },
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>',
                    src: '*.html',
                    dest: '<%= path.dist %>'
                }]
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
                    archive: '<%= path.dist %>/<%= pkg.name %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>/',
                    src: '**',
                    dest: './'
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= path.app %>/scripts/main.js'
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
        'includereplace',
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
