const express = require('express');
const app = express();

const http = require('http').createServer(app);
var io = require('socket.io')(http);
const users = require('./users.js');

const configRoutes = require('./routes');
const session = require('express-session');

const cors = require('cors');

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

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', ({name, room}) => {
    // add user to list of users
    const {user, error} = users.addUser(socket.id, name, room);
    if (error) console.error(error);

    // join user to room
    console.log('A user joined their name is ' + name);
    socket.join(user.room);

    const userList = users.getUsers(room).join(', ');

    // alert all users in room of the join
    io.to(room).emit('user_join', {name, room, userList});
  });

  socket.on('message', ({name, message}) => {
    const user = users.getUser(socket.id);
    console.log(name, message, socket.id);
    // emit message to specific room
    io.to(user.room).emit('message', {name, message});
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Fired', socket.id);
    const user = users.getUser(socket.id);
    const name = user.name;
    const room = user.room;
    users.deleteUser(socket.id);
    console.log(users.getUsers(room))
    const userList = users.getUsers(room).join(', ');
    io.to(user.room).emit('user_leave', {name, userList});
  });
});

configRoutes(app);

http.listen(5173, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5173');
  console.log();
});