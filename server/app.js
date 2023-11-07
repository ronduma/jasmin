const app = require('express')(); // Note the parentheses after require('express')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const chatroom = require('./data/chatroom');
const express= require('express');
const cors = require('cors')

app.use(cors())
app.use(express.json());

// Define a route to handle messages for a specific psychologist
app.get('/messages', async (req, res) => {
  let psychologist = req.query.psychologist;
  // NEED LOGINED USER
  let username = 'jae'; 
  console.log("psychologist="+psychologist)
  console.log("user="+username)
  

  try {
    // get messsages
    const messages = await chatroom.getMessagesByUsers(username, psychologist);
    console.log(messages)
    // Return the retrieved messages in the response
    res.json(messages);
  } catch (error) {
    console.error('Error getting old messages:', error);
    res.status(500).json({ error: 'Error getting old messages' });
  }
});
io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', ({ name, psychologist }) => {
    console.log('A user joined. Their name is ' + name);
    console.log('Psychologist = ' + psychologist);

    // Join the new private room based on the psychologist's name
    socket.join(psychologist);

    chatroom.addUser(socket.id, name, psychologist);
    socket.to(psychologist).emit('user_join', { name, psychologist });
  });

  socket.on('message', ({ name, message, psychologist }) => {
    console.log(name, message, psychologist, socket.id);

    // Send the message only to users in the same private room (psychologist's room)
    chatroom.addMessages(socket.id, name, psychologist, message);
    io.to(psychologist).emit('message', { name, message });
  });

  socket.on('disconnect', () => {
    // Delete the user
    const deleteUser = chatroom.deleteUser(socket.id);
    if (deleteUser) {
      socket.to(deleteUser.psychologist).emit('user_leave', deleteUser);
    }
    console.log('Disconnect Fired');
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});
