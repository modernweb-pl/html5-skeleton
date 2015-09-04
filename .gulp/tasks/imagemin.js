var gulp = require('gulp');
var config = require('../config').imagemin;
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {
  return gulp.src(config.src)
      .pipe(imagemin(config.options))
      .pipe(gulp.dest(config.dest));
});
