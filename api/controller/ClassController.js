'use strict';

let mongoose = require('mongoose'),
    Class = mongoose.model('Class'),
    User = mongoose.model('User');

    exports.list_all_class = function(req, res) {
      let _userId = req.params.userId;
        Class.find({userId:_userId},{'_id':1,'ClassName':1} , function(err, class_) {
          if (err)
            res.send(err);
          res.json(class_);
        });
      };
      
      exports.list_all_classNames= function(req, res) {
        let _userId = req.params.userId;
        Class.find({userId:_userId},{'_id':0,'ClassName':1} , function(err, class_) {
          if (err)
            res.send(err);
          res.json(class_);
        });
      }
      
       
      exports.create_a_class = function(req, res) {
        let _userId = req.params.userId;
        let class_ = req.body.ClassName;
        let professor = req.body.Professor;
        var new_class = new Class({ClassName: class_, Professor: professor, userId: _userId});
        new_class.save(function(err, class_) {
          if (err)
            res.send(err);
          res.json(class_);
        });
      };
      
      
      exports.read_a_class = function(req, res) {
        Class.findById(req.params.classId, function(err, class_) {
          if (err)
            res.send(err);
          res.json(class_);
        });
      };
      
      
      exports.update_a_class = function(req, res) {
        let class_ = req.body.ClassName;
        let professor = req.body.Professor;
        Class.findOneAndUpdate({_id: req.params.classId}, {ClassName: class_, Professor: professor}, {new: true}, function(err, class_) {
          if (err)
            res.send(err);
          res.json(class_);
        });
      };
      
      
      exports.delete_a_class = function(req, res) {
        Class.deleteOne({
          _id: req.params.classId
        }, function(err, class_) {
          if (err)
            res.send(err);
          res.json({ message: 'class successfully deleted' });
        });
      };