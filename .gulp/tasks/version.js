var gulp = require('gulp');
var header = require('gulp-header');
var dateFormat = require('dateformat');
var config = require('../config');

var date = dateFormat(new Date(), 'dd.mm.yyyy HH:MM:ss');

gulp.task('version', function() {
  gulp.src(config.paths.build + '/**/*.html')
      .pipe(header('<!-- built on <%= date %> -->\n', {date: date}))
      .pipe(gulp.dest(config.paths.build));

  gulp.src(config.paths.build + '/**/*.{css,js}')
      .pipe(header('/* built on <%= date %> */\n', {date: date}))
      .pipe(gulp.dest(config.paths.build));
});
