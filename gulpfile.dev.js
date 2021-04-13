"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('buildSass', function (done) {
  gulp.src('./sass/*.scss').pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError)).pipe(gulp.dest('./css'));
  done();
});
gulp.task('default', function () {
  gulp.watch('./sass/*.scss', gulp.series('buildSass'));
});