'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'build/vendor.js',
      'build/application.js',
      'tests/mocha_helper.coffee',
      'tests/**/*_mocha.coffee'
    ],
    exclude: [
      '**/*.sw?'
    ],
    preprocessors: {
      '**/*.coffee': ['coffee']
    },
    port: 9876,
    browsers: ['Chrome'],
  });
};
