const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
let messages = [];
let users = [];

app.use(express.static('client'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (userName) => {
    console.log(`New user! ${userName} has joined the chat.`)
    
    users.push({ id: socket.id, name: userName });
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
    console.log(users);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    };
    console.log('Oh, socket ' + socket.id + ' has left')
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});