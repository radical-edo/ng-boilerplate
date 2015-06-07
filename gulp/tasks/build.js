'use strict';

// general dependencies
var gulp = require('gulp');
var config = require('../config');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var _ = require('lodash');

// js dependencies
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var bowerFiles = require('main-bower-files');

// templates dependencies
var html2js = require('gulp-ng-html2js');

// scss dependencies
var sass = require('gulp-sass');

function buildStyles() {
  return gulp.src(config.paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dest));
}

function buildTemplates () {
  return gulp.src(config.paths.templates)
    .pipe(html2js({
      moduleName: 'templates',
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(config.paths.dest));
}

function buildVendor () {
    return gulp.src(bowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.paths.dest))
}

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

var INJECT_OPTIONS = {
  ignorePath: config.paths.dest,
  addRootSlash: false,
};

module.exports = function() {
  return gulp.src(config.paths.index)
    .pipe(inject(buildStyles(), INJECT_OPTIONS))
    .pipe(inject(buildVendor(), _.merge({ name: 'vendor'}, INJECT_OPTIONS)))
    .pipe(inject(buildTemplates(), _.merge({ name: 'templates' }, INJECT_OPTIONS)))
    .pipe(inject(buildApp(), INJECT_OPTIONS))
    .pipe(gulp.dest(config.paths.dest));
};
