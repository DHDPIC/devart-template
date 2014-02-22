var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  // let them know their id
  socket.emit('connected', socket.id);

  socket.on('orientation', function (data) {
    socket.broadcast.emit('orientation', data);
  });
});