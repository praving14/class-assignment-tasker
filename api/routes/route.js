'use strict';

module.exports = function (app) {
  var classTracker = require('../controller/ClassController');
  var taskTracker = require('../controller/TaskController');
  var userTracker = require('../controller/UserController');
  // todoList Routes
  app.route('/api/:userId/class')
    .get(classTracker.list_all_class)
    .post(classTracker.create_a_class);

  app.route('/api/:userId/classNames')
    .get(classTracker.list_all_classNames);

  app.route('/api/class/:classId')
    .get(classTracker.read_a_class)
    .put(classTracker.update_a_class)
    .delete(classTracker.delete_a_class);

  app.route('/api/:userId/task')
    .get(taskTracker.list_all_task)
    .post(taskTracker.create_a_task);

  app.route('/api/task/:taskId')
    .get(taskTracker.read_a_task)
    .put(taskTracker.update_a_task)
    .delete(taskTracker.delete_a_task);

  app.route('/api/completeTask/:taskId')
    .put(taskTracker.complet_a_task);

  app.route('/api/:userId/getTaskByDeadline/:deadline')
    .get(taskTracker.get_task_by_deadline)

  app.route('/api/:userId/getTaskByClass/:className')
    .get(taskTracker.get_task_by_class)

  app.route('/api/user/login')
    .post(userTracker.user_login);

    app.route('/api/user/register')
    .post(userTracker.register);

};
