'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
    Description:{
        type: String,
        required: 'Task Description is required',
        maxlength:[20,'Task Description cannot be longer than 50 chars'],
    },
    ClassName:{
        type: String,
        required: 'Class name is required',
        maxlength:[20,'ClassName cannot be longer than 20 chars'],
    },
    Deadline: {
        type: Date,
        required: 'Deadline is required'
    },
    Notes:{
        type:String,
        maxlength:[200,'Task Description cannot be longer than 200 chars']
    },
    Completed:{
        type:Boolean,
        default: false
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: 'UserId is required',
    }
},);

module.exports = mongoose.model('Task', TaskSchema);