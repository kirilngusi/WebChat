const db = require('../db');
const shortid = require('shortid');

const express = require('express')
const app = express()

const http = require('http').createServer(app)

const io = require('socket.io')(http);
const socket = io();

module.exports.login = (req,res) => {
    res.render('users/login', {
        users: db.get('users').value()
    });
};


module.exports.register = (req,res) => {
    console.log(req.cookies);

    res.render('users/register');
}


module.exports.postCreate = (req,res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    // console.log(req.body)
    res.redirect('/users/login')
};


// module.exports.home = (req,res) => {
    
//     var test = [
//         {name:"Tuan ", age: 18}
//     ]
//     var title = "No render"
//     var textarea = "Hello"

    // textarea.addEventListener('keyup', (e) => {
    //     if(e.key === 'Enter') {
    //         sendMessage(e.target.value);
    //     }
    // })
    // function sendMessage(message) {
    //     let msg = {
    //         user: name,
    //         message: message
    //     }
    //     //append
    //     appendMessage(msg,'outgoing');
    
    //     //sent to server
    //     socket.emit('message', msg );
    // }

    // textarea.addEventListener('keyup', (e) => {
    //     if(e.key === 'Enter') {
    //         sendMessage(e.target.value);
    //     }
    // })
    
    
//     //Recieve message
//     io.on('message', (msg) => {
//         appendMessage(msg, 'incoming');
//     })

//     res.render('index', {    
//         // users: db.get('users').value()
//         title: title,
//         textarea: textarea

//     });
// };