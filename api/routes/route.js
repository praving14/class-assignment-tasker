'use strict';
let middleware = require('./../../middleware.js');

module.exports = function (app) {
  var classTracker = require('../controller/ClassController');
  var taskTracker = require('../controller/TaskController');
  var userTracker = require('../controller/UserController');
  // todoList Routes
  app.route('/api/:userId/class')
    .get(middleware.verifyToken,classTracker.list_all_class)
    .post(middleware.verifyToken, classTracker.create_a_class);

  app.route('/api/:userId/classNames')
    .get(middleware.verifyToken,classTracker.list_all_classNames);

  app.route('/api/class/:classId')
    .get(middleware.verifyToken,classTracker.read_a_class)
    .put(middleware.verifyToken,classTracker.update_a_class)
    .delete(middleware.verifyToken,classTracker.delete_a_class);

  app.route('/api/:userId/task')
    .get(middleware.verifyToken,taskTracker.list_all_task)
    .post(middleware.verifyToken, taskTracker.create_a_task);

  app.route('/api/task/:taskId')
    .get(middleware.verifyToken,taskTracker.read_a_task)
    .put(middleware.verifyToken,taskTracker.update_a_task)
    .delete(middleware.verifyToken, taskTracker.delete_a_task);

  app.route('/api/completeTask/:taskId')
    .put(middleware.verifyToken, taskTracker.complet_a_task);

  app.route('/api/:userId/getTaskByDeadline/:deadline')
    .get(middleware.verifyToken,taskTracker.get_task_by_deadline)

  app.route('/api/:userId/getTaskByDeadlinePassed/:deadline')
    .get(middleware.verifyToken, taskTracker.get_task_by_deadline_passed)

  app.route('/api/:userId/getTaskByClass/:classId')
    .get(middleware.verifyToken, taskTracker.get_task_by_class)

  app.route('/api/user/login')
    .post(userTracker.user_login);

  app.route('/api/user/register')
    .post(userTracker.register);

};
