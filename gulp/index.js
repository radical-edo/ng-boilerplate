var gulp = require('gulp');
var path = require('path');

module.exports = function (tasks) {
  tasks.forEach(function (task) {
    gulp.task(task, require(path.resolve(__dirname, 'tasks', task)));
  });
};
