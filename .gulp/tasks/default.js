var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('gulp-sequence');

gulp.task('default', function() {
  sequence('build', ['connect', 'watch'], function() {
    gutil.log(gutil.colors.green('Waiting for changes...'));
  });
});
