'use strict';

var gulp = require('gulp');
var config = require('../config');
var inject = require('gulp-inject');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

function buildApp () {
  return browserify(config.paths.js, {
    debug: true,
  })
  .transform(babelify)
  .bundle()
  .on('error', console.error)
  .pipe(source('application.js'))
  .pipe(gulp.dest(config.paths.dest));
}

module.exports = function() {
  return gulp.src(config.paths.index)
      .pipe(inject(buildApp(), { ignorePath: config.paths.dest, addRootSlash: false }))
      .pipe(gulp.dest(config.paths.dest));
};
