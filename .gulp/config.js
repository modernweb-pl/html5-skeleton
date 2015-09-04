var path = require('path');

var dirs = {};
dirs.images = 'images';
dirs.styles = 'styles';
dirs.scripts = 'scripts';
dirs.config = 'config';

var paths = {};
paths.base = '.';
paths.src = paths.base + '/app';
paths.build = paths.base + '/build';
paths.config = path.join(paths.src, dirs.config);
paths.images = path.join(paths.src, dirs.images);
paths.styles = path.join(paths.src, dirs.styles);
paths.scripts = path.join(paths.src, dirs.scripts);
paths.views = paths.src;
paths.vendor = 'node_modules';

module.exports = {
  paths: paths,

  clean: [
    paths.build + '/*'
  ],

  browserify: {
    bundles: [{
      entries: './' + paths.scripts + '/index.js',
      dest: path.join(paths.build, dirs.scripts),
      outputName: 'app.js'
    }]
  },

  uglify: {
    src: path.join(paths.build, dirs.scripts),
    dest: path.join(paths.build, dirs.scripts),
    options: {}
  },

  sass: {
    src: paths.styles,
    dest: path.join(paths.build, dirs.styles),
    options: {
      includePaths: [
        paths.vendor + '/bootstrap-sass/assets/stylesheets',
        paths.vendor + '/font-awesome/scss'
      ]
    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    }
  },

  minify: {
    src: path.join(paths.build, dirs.styles),
    dest: path.join(paths.build, dirs.styles),
    options: {
      keepSpecialComments: 0 // remove all
    }
  },

  sprites: {
    src: paths.images + '/sprites/*.png',
    dest: {
      css: path.join(paths.styles, 'config'),
      image: path.join(paths.build, dirs.images)
    },
    options: {
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: path.join('../', dirs.images, '/sprites.png'),
      cssVarMap: function(sprite) {
        sprite.name = 'sprite-' + sprite.name;
      }
    }
  },

  include: {
    src: paths.src + '/*.html',
    dest: paths.build,
    options: { // https://github.com/coderhaoxin/gulp-file-include#options
      context: require('../' + paths.config + '/replace')
    }
  },

  connect: { // https://github.com/avevlad/gulp-connect#api
    root: [paths.build, paths.src],
    host: '*',
    port: 9000
  }
};
