var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var config = require('../config').htmlmin;

gulp.task('htmlmin', function() {
  return gulp.src(config.src)
      .pipe(htmlmin(config.options))
      .pipe(gulp.dest(config.dest))
});
