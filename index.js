var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var busboy = require('connect-busboy');

var home = process.env.DEIS && process.env.HOME || '.';

app.use(busboy());

app.use(function(req, res, next){
  if (req.busboy){
    req.busboy.on('file', function( fileMoniker, file, fileName, enc, mime ){
    });
    req.pipe(req.busboy);
  }
  next();
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

