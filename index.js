var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

var DEFAULT_PORT = '3000';
var port = process.env.PORT || DEFAULT_PORT;

http.listen(port, function(){
  console.log('listening on *:'+port);
});

