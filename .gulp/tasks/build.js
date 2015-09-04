var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('build', sequence(
    'clean',
    ['sprites', 'include', 'copy'],
    ['minify-css', 'uglify-js', 'imagemin'],
    'version'
));
