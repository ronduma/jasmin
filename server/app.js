const express = require('express');
const app = express();

const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  })
})

const configRoutes = require('./routes');
const session = require('express-session');
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
configRoutes(app);

server.listen(5173, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5173');
  console.log();
});