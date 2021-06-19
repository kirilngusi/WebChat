const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const fs = require('fs');
const PORT = process.env.PORT || 5000
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

//require
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const { render } = require('ejs');

//set
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.set('views', './views');

// app.set('view engine', 'html');
// app.set('view engine', 'html');

// app.engine('html', require('ejs').renderFile);

//file static public //
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


//use
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use('/users', userRoutes);
app.use('/users', authRoutes);

// app.get('/users/home', (req,res) => {
//     res.render('index.html')
// })



// this will run whenever a socket connects to server
io.on('connection', (socket) => {
    /* 'joining-details' will be fired from frontend which 
      will give us user details to setup in our server */
    console.log("connected...");
    socket.on('message', (msg) => {
          socket.broadcast.emit('message', msg)
    })
    socket.send("e")

})



app.get('/users/home', (req,res) => {
  res.render('index.html')
})

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

