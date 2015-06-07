'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var _ = require('lodash');

function build() {
  gulp.start('build');
}

module.exports = function () {
  build();
  var watchable = _.chain(config.paths).omit('dest').values().value();
  return watch(watchable, build);
};
