var include = require('gulp-file-include');
var gulp = require('gulp');
var config = require('../config').include;

gulp.task('include', function() {
  gulp.src(config.src)
      .pipe(include(config.options))
      .pipe(gulp.dest(config.dest));
});
