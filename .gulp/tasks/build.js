var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('build', sequence(
    'clean',
    ['sprites', 'include', 'copy', 'fonts'],
    ['minify-css', 'uglify-js', 'imagemin', 'htmlmin'],
    'version',
));
