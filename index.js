var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./upload')(app);

var home = process.env.DEIS && process.env.HOME || '.';

app.post('/', function(req, res){
  io.emit('chat message', req.fileName);
  var imageData  = [];
  console.log('reading file');
  req.file.on('data', function(data){
    console.log('processing');
    imageData.push(data);
  });
  req.file.on('end', function(data){
    console.log('sending file');
    io.emit('image', {image: true, buffer: imageData});
    res.send('success');
  });
});

app.get('/', function(req, res){
  res.sendfile(home + '/index.html');
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

