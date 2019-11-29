const express = require('express');
const app = express();
const port = 3000;
let mongoose = require('mongoose');
let Class = require("./api/model/Class");
bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/classAssignemntTracker',{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require("./api/routes/route");
routes(app);

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
