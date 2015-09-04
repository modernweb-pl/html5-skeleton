var gulp = require('gulp');
var header = require('gulp-header');
var Stream = require('merge-stream');
var dateFormat = require('dateformat');
var config = require('../config');

var date = dateFormat(new Date(), 'dd.mm.yyyy HH:MM:ss');

gulp.task('version', function() {
  var stream = new Stream();

  stream.add(gulp.src(config.paths.build + '/**/*.html')
      .pipe(header('<!-- built on <%= date %> -->\n', {date: date}))
      .pipe(gulp.dest(config.paths.build)));

  stream.add(gulp.src(config.paths.build + '/**/*.{css,js}')
      .pipe(header('/* built on <%= date %> */\n', {date: date}))
      .pipe(gulp.dest(config.paths.build)));

  return stream;
});
