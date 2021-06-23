const express = require('express')
const app = express()
const PORT = 5000;

// var server = require('http').Server(app);
// const http = require('http').createServer(app)
var server = require('http').Server(app);

// const io = require('socket.io')(http);
const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});

server.listen(5000);
const fs = require('fs');
// const PORT = process.env.PORT || 5000
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
    // socket.send("e")

})


// io.on('connection', function (socket) {
  
//   socket.emit('welcome', { data: 'welcome' });

//   socket.on('new' , function(data) {   
//           console.log('connected...')
//           io.sockets.emit( 'next' , { data : data } )
//     })
// });


app.get('/users/home', (req,res) => {

  res.render('index.html')
})

// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })

