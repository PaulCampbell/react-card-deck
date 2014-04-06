var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var path = require('path');
var plumber = require('gulp-plumber')
var gutil = require('gulp-util')
var reactify = require('reactify')

var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err.message))
  gutil.log(err)
};

// Builds the scripts based on a single entry point using browserify
gulp.task('scripts', function() {
    return gulp.src(['./react-swipe.jsx'])
    .pipe(plumber({
      errorHandler: onError,
      transform: 'reactify'
    }))
    .pipe(browserify({
          insertGlobals: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', function() {
  gulp.watch(['./react-swipe.jsx'],['scripts'], function() {});
});
