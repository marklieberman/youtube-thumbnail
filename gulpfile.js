'use strict';

var gulp     = require('gulp'),
    jshint   = require('gulp-jshint'),
    zip      = require('gulp-zip');

var sources = {
  js: [
    'src/**/*.js'
  ],
  dist: [
    'src/**'
  ]
};

gulp.task('default', [ 'lint', 'watch' ]);

gulp.task('watch', function () {
  gulp.watch(sources.js, [ 'lint' ]);
});

gulp.task('lint', function () {
  return gulp.src(sources.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('dist', [ 'lint' ], function () {
  return gulp.src(sources.dist)
    .pipe(zip('youtube-thumbnail.xpi', {
      compress: false
    }))
    .pipe(gulp.dest('dist'));
});
