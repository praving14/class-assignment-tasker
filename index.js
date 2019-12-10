const express = require('express');
const app = express();
const port = 3000;
let mongoose = require('mongoose');
let Class = require("./api/model/Class");
let Task = require("./api/model/Task");
let User = require("./api/model/User");
bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/classAssignemntTracker',{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true, useFindAndModify:false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/welcome', function (req, res) {
    res.sendFile("web/views/welcome.html", { root: __dirname });
});
app.get('/', function (req, res) {
    res.sendFile("web/views/welcome.html", { root: __dirname });
});

app.get("/welcome.js", function (req, res) {
    res.sendFile("web/welcome.js", { root: __dirname });
});

app.get("/login.js", function (req, res) {
    res.sendFile("web/loginAjax.js", { root: __dirname });
});

app.get("/newUserAjax.js", function (req, res) {
    res.sendFile("web/newUserAjax.js", { root: __dirname });
});

app.get("/create-account", function (req, res) {
    res.sendFile("web/views/new_user.html", { root: __dirname });
});

app.get("/login", function (req, res) {
    res.sendFile("web/views/login.html", { root: __dirname});
});

app.get("/home", function (req, res) {
    res.sendFile("web/views/home.html", { root: __dirname});
});
app.get("/home.js", function (req, res) {
    res.sendFile("web/home.js", { root: __dirname });
});
app.get("/home.css", function (req, res) {
    res.sendFile("web/home.css", { root: __dirname });
});
app.get("/tasks", function (req, res) {
    res.sendFile("web/views/tasks.html", { root: __dirname });
});
app.get("/tasks.js", function (req, res) {
    res.sendFile("web/tasks.js", { root: __dirname });
});


app.get("/task/Profile", function (req, res) {
    res.sendFile("web/views/taskProfile.html", { root: __dirname });
});
app.get("/taskProfile.js", function (req, res) {
    res.sendFile("web/taskProfile.js", { root: __dirname });
});
let routes = require("./api/routes/route");
routes(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
