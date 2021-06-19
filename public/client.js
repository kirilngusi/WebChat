const io = require('socket.io')(5000);
const socket = io('http://localhost:5000');
const express = require('express');
const socket = io();

const name = document.querySelector('.input-lg')

let textarea = document.getElementById('.textarea');
let messageArea = document.querySelector('.message__area');

//name


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})


function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }
    //append
    appendMessage(msg,'outgoing');

    //sent to server
    socket.emit('message', msg );
}


function appendMessage(msg,type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
     <h4> ${msg.user} </h4>
     <p> ${msg.message} </p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

//Recieve message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
})


// console.log("HGEloo")