var gulp = require('gulp');
var config = require('../config').uglify;
var uglify = require('gulp-uglify');
var size = require('gulp-size');

gulp.task('uglify-js', ['browserify'], function() {
  return gulp.src(config.src + '/*.js')
      .pipe(uglify(config.options))
      .pipe(gulp.dest(config.dest))
      .pipe(size())
      .pipe(size({gzip: true}));
});
