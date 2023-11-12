const express = require('express');
const app = express();
const http = require('http').createServer(app);
const configRoutes = require('./routes');
const session = require('express-session');
var io = require('socket.io')(http);
const cors = require('cors');
const chatroom = require('./data/chatroom')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false}
  })
);

app.use('/register', (req, res, next) => {
  if (req.session.user) {
    console.log('/register: logged in')
    return res.redirect('/profile');
  } else {
    console.log('/register: not logged in')
    next(); 
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    console.log('/login: logged in')
    return res.redirect('/profile');
  } else {
    console.log('/login: not logged in')
    next(); 
  }
});

app.use('/profile', (req, res, next) => {
  if (!req.session.user) {
    console.log('/profile: not logged in')
    return res.redirect('/login');
  } else {
    console.log('/profile: logged in')
    next(); 
  }
});

app.use('/logout', (req, res, next) => {
  if (!req.session.user) {
    console.log('/logout: not logged in')
    return res.redirect('/login');
  } else {
    console.log('/logout: logged in')
    next(); 
  }
});


// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

configRoutes(app);


//Chat
io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', ({name, psychologist }) => {
    console.log('A user joined their name is ' + name);
    console.log('psychologist = ' + psychologist);
    // socket.broadcast.emit('user_join', {name, roomNumber});
    //https://stackoverflow.com/questions/40367765/joining-socket-io-room-on-connect
    //i spent 1 hours trying to find
    socket.join(psychologist)
    chatroom.addUser(socket.id, name, psychologist);
    socket.to(psychologist).emit('user_join', {name, psychologist});
  });

  socket.on('message', ({name, message, psychologist}) => {
    console.log(name, message,psychologist, socket.id);
    // io.emit('message', {name, message});
    
    io.to(psychologist).emit('message', {name, message});
  });

  socket.on('disconnect', () => {
    //delete user
    const deleteUser = chatroom.deleteUser(socket.id);
    if (deleteUser){
      //same
      // io.in(deleteUser.roomNumber).emit('user_leave', deleteUser);
      socket.to(deleteUser.psychologist).emit('user_leave', deleteUser);
    }
    console.log('Disconnect Fired');
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5000');
  console.log();
});