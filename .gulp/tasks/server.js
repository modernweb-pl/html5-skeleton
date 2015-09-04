var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('gulp-sequence');

gulp.task('server', function() {
  sequence(
      'clean',
      ['sprites', 'include', 'fonts'],
      'sass',
      ['connect', 'watch'],
      function() {
        gutil.log(gutil.colors.green('Waiting for changes...'));
      });
});
