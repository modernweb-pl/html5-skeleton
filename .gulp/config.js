var path = require('path');

var paths = {};
paths.base = '.';
paths.src = paths.base + '/app';
paths.build = paths.base + '/build';
paths.images = paths.src + '/images';
paths.styles = 'styles';
paths.scripts = paths.src + '/scripts';
paths.views = paths.src;
paths.vendor = 'node_modules';

module.exports = {
  paths: paths,

  sass: {
    src: path.join(paths.src, paths.styles),
    dest: path.join(paths.build, paths.styles),
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
  }
};
