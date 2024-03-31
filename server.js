const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
let messages = [];

app.use(express.static('client'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(8000, () => {
  console.log('server is running on port 8000');
});

const io = socket(server);