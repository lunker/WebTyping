var express=require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path=require('path');

console.log(process.env.NODE_ENV);

app.use('/public',express.static(path.resolve(__dirname + '/../public/')));

app.get('/', function(req, res){
  // console.log(path.resolve(__dirname + '/../index.html'));
  // res.sendFile(path.resolve(__dirname + '/../index.html'));
  res.sendFile('/Users/voiceloco/work/WebTyping/index.html');
});

io.on('connection', function(socket){
  console.log('[Server] a user connected');

	socket.emit('data', 'asfd');

  socket.on('data', (request)=>{
    console.log('Request from client: ' + request);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
