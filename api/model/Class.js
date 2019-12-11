'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClassSchema = new Schema({
    ClassName:{
        type: String,
        required: 'Class name is required',
        maxlength:[20,'ClassName cannot be longer than 20 chars'],
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    Professor:{
        type: String,
        maxlength:[50,'Professor Name cannot be longer than 50 chars'],
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: 'UserId is required',
    }
});

module.exports = mongoose.model('Class', ClassSchema);