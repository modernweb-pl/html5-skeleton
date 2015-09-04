var path = require('path');
var dateFormat = require('dateformat');
var package = require('../package.json');

var dirs = {};
dirs.fonts = 'fonts';
dirs.images = 'images';
dirs.scripts = 'scripts';
dirs.styles = 'styles';
dirs.config = 'config';

var paths = {};
paths.base = '.';
paths.src = paths.base + '/app';
paths.build = paths.base + '/build';

paths.config = path.join(paths.src, dirs.config);
paths.fonts = path.join(paths.src, dirs.fonts);
paths.images = path.join(paths.src, dirs.images);
paths.scripts = path.join(paths.src, dirs.scripts);
paths.styles = path.join(paths.src, dirs.styles);
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
  },

  // production build stuff

  copy: {
    base: paths.src,
    src: [
      paths.src + '/{.htaccess,*.ico,robots.txt,crossdomain.xml}',
      paths.images + '/**',
      '!' + paths.images + '/sprites{,/**}',
      paths.fonts + '/**'
    ],
    dest: paths.build
  },

  uglify: {
    src: path.join(paths.build, dirs.scripts),
    dest: path.join(paths.build, dirs.scripts),
    options: {}
  },

  minify: {
    src: path.join(paths.build, dirs.styles),
    dest: path.join(paths.build, dirs.styles),
    options: {
      keepSpecialComments: 0 // remove all
    }
  },

  imagemin: {
    src: path.join(paths.build, dirs.images) + '/**',
    dest: path.join(paths.build, dirs.images),
    options: {
      progressive: true
    }
  },

  htmlmin: {
    src: paths.build + '/**/*.html',
    dest: paths.build,
    options: { // https://github.com/kangax/html-minifier#options-quick-reference
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true
    }
  },

  zip: {
    src: paths.build + '/**',
    dest: paths.base,
    archive: [package.name, '_', dateFormat(new Date(), 'yyyymmdd-HHMM'), '.zip'].join('')
  }
};
