'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClassSchema = new Schema({
    ClassName:{
        type: String,
        required: 'Class name is required'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    Professor:{
        type: String
    }
});

module.exports = mongoose.model('Class', ClassSchema);