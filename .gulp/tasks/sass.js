var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var errorHandler = require('../utils/error_handler');
var config = require('../config').sass;

gulp.task('sass', function() {
  return gulp.src(config.src + '/*.{scss,sass}')
      .pipe(sourcemaps.init())
      .pipe(plumber({
        errorHandler: errorHandler
      }))
      .pipe(sass(config.options))
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest));
});
