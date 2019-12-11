let mongoose = require('mongoose');
const config = require('./config.js');

mongoose.connect(config.DBURL,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true, useFindAndModify:false });