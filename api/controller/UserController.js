'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config.js');

let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.user_login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }, function (err, user) {
        if (err)
            res.send(err);
        if (user) {
            user.comparePassword(password, (err, match) => {
                if (err) {
                    res.send(err);
                }
                if(match){
                    const token = jwt.sign({ "username": username, "password": password }, config.secretKey, { expiresIn: '12h' });
                    res.json({ success: true, message: 'Successfully logged in', User: user, token: token });
                }else{
                    res.json({ success: false, message: 'Invalid Username or Password' });
                }
            });
        } else {
            res.json({ message: 'Invalid Username or Password' });
        }
    });
};

exports.register = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }, function (err, user) {
        if (err)
            res.send(err);
        if (user) {
            res.json({ message: 'User name already exist' });
        } else {
            let user = new User({
                username,
                password
            })
            user.save(function (err, usr) {
                if (err) {
                    res.send({
                        success: false,
                        message: "Something went wrong. Please try again later."
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'User Successfully Created.'
                    });
                }
            });
        }
    });
};