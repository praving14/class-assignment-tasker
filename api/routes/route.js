'use strict';

module.exports = function(app) {
  var classTracker = require('../controller/ClassController');
  // todoList Routes
  app.route('/class')
    .get(classTracker.list_all_class)
    .post(classTracker.create_a_class);


  app.route('/class/:classId')
    .get(classTracker.read_a_class)
    .put(classTracker.update_a_class)
    .delete(classTracker.delete_a_class);
};
