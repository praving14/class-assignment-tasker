'use strict';

let mongoose = require('mongoose'),
    Task = mongoose.model('Task');

    exports.list_all_task = function(req, res) {
      let _userId = req.params.userId;
        Task.find({userId:_userId},{'_id':1,'Description':1} , function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        });
      };
          
      exports.create_a_task = function(req, res) {
        let _userId = req.params.userId;
        let task = req.body.Task;
        let class_ = req.body.ClassName;
        let class_id = req.body.classId;
        let deadline = req.body.deadline;
        let notes = req.body.notes;
        var new_task = new Task({userId: _userId,Description: task,classId: class_id,ClassName: class_, Deadline: deadline, Notes: notes});
        new_task.save(function(err, task) {
          if (err)
            res.send(err);
            res.json({ success:true, message: 'Task successfully Updated' });
        });
      };
      
      
      exports.read_a_task = function(req, res) {
        Task.findById(req.params.taskId, function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        });
      };
       
      
      exports.update_a_task = function(req, res) {
        let description = req.body.description;
        let deadline = req.body.deadline;
        let notes = req.body.notes;
        Task.findOneAndUpdate({_id: req.params.taskId}, {Description: description, Deadline: deadline, Notes: notes}, {new: true}, function(err, task) {
          if (err)
            res.send(err);
            res.json({ success: true, message: 'Task successfully Updated' });
        });
      };
      exports.complet_a_task = function(req, res) {
        let completed = true;
        Task.findOneAndUpdate({_id: req.params.taskId}, {Completed:completed }, {new: true}, function(err, task) {
          if (err)
            res.send(err);
            res.json({ success: true, message: 'Task successfully completed' });
        });
      };
      
      
      exports.delete_a_task = function(req, res) {
        Task.deleteOne({
          _id: req.params.taskId
        }, function(err, task) {
          if (err)
            res.send(err);
          res.json({ success:true, message: 'Task successfully deleted' });
        });
      };

      exports.get_task_by_deadline = function(req,res){
        //get data by deadline
        let _userId = req.params.userId;
        let date_ = req.params.deadline;
        let newDate = new Date();
        Task.find({userId:_userId,Completed:false,Deadline: {"$lte":date_, "$gte":newDate} },{'_id':1,'Description':1, 'Deadline':1, 'ClassName':1},{sort:{'ClassName':1,'Deadline':1}} , function(err, task) {
          if (err)
            res.send(err)
          res.json(task);
        }).sort([]);
      }

      exports.get_task_by_deadline_passed = function(req,res){
        //get data by deadline
        let _userId = req.params.userId;
        let newDate = new Date();
        Task.find({userId:_userId,Completed:false, Deadline: {"$lt":newDate} },{'_id':1,'Description':1, 'Deadline':1, 'ClassName':1},{sort:{'ClassName':1,'Deadline':1}} , function(err, task) {
          if (err)
            res.send(err)
          res.json(task);
        }).sort([]);
      }



      exports.get_task_by_class = function(req,res){
        let _userId = req.params.userId;
        let classid = req.params.classId;
        Task.find({userId:_userId, classId: classid},{'_id':1,'Description':1, 'Deadline':1, 'Completed':1},{sort:{'Deadline':1}} , function(err, task) {
          if (err)
            res.send(err);
          res.json(task);
        }).sort([]);
      }