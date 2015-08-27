// npm install --save socket.io
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(client){
  console.log('Client Connected');
  client.emit('messages', {hello: 'world'});
  client.on('messages', function(data) {
    console.log(data);
    // get the nickname of the client before broadcasting message
    var nickname = client.nickname;
    //broadcast with the name and message
    client.broadcast.emit('message', nickname + ": " + message);
    //send the same message back to our client
    client.emit('messages', nickname + ': ' + message);
    client.broadcast.emit('messages', data);
  });
  client.on('join', function(name) {
    client.nickname = name;
  });
});
io.on('connection', function(client){
  client.on('join', function(name) {
    client.nickname = name;
  });
});
//start of section 7
var messages = [];
var storeMessage = function(name, data) {
  messages.push({name: name, data: data});
  if (messages.length > 10) {
    messages.shift();
  }
};
io.sockets.on('connection', function(client){
  client.on('join', function(name){
    client.set('nickname', name);
    client.broadcast.emit('chat', name + " joined the chat");
  });
  client.on('messages', function(message) {
    client.get('nickname', function(error, name) {
      client.broadcast.emit('messages', name + ': ' + message);
      client.emit('messages', name + ': ' + message);
    });
  });
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
server.listen(8080);
