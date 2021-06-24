const db = require('../db');
const shortid = require('shortid');

const express = require('express')

module.exports.login = (req,res) => {
    res.render('users/login', {
        users: db.get('users').value()
    });
};


module.exports.register = (req,res) => {

    //render userId
    console.log(req.cookies);

    res.render('users/register');
}


module.exports.postCreate = (req,res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    // console.log(req.body)
    res.redirect('/users/login')
};


module.exports.home = (req,res) => {
    // var username = req.body.Username;
    // console.log(username);
    var cookie = req.cookies.userId;
    // cookie = 'y1lQoG_pF'
    var users = db.get('users').value();
    // console.log(user.id);
    // console.log(users);
    // console.log(cookie);

    res.render('index', {
        users: users,
        cookie: cookie


    });
}
