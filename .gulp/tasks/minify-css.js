var gulp = require('gulp');
var config = require('../config').minify;
var minify = require('gulp-minify-css');
var size = require('gulp-size');

gulp.task('minify-css', ['sass'], function() {
  return gulp.src(config.src + '/*.css')
      .pipe(minify(config.options))
      .pipe(gulp.dest(config.dest))
      .pipe(size())
      .pipe(size({gzip: true}));
});
