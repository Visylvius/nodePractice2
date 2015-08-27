// npm install --save socket.io
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redisClient = redis.createClient();
var storeMessage = function(name, data) {
  var message = JSON.stringify({name: name, data: data});
  redisClient.lpush('messages', message, function(err, response) {
    redisClient.ltrim('messages', 0, 9);
  });
};
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
    client.broadcast.emit('add chatter', name);
    redistClient.smembers('names', function(err, names) {
      names.forEach(function(name) {
        client.emit('add chatter', name);
      });
    });
    client.on('disconnect', function(name) {
      client.get('nickname', function(err, name) {
        client.broadcast.emit('remove chatter', name);
        reditsClient.srem('chatters', name);
      });
    });
    redisClient.sadd('chatters', name);
    redisClient.lrange('messages', 0, -1, function(err, messages) {
      messages = messages.reverse();
      messages.forEach(function(message) {
        message = JSON.parse(message);
        client.emit('messages', message.name + ': ' + message.data);

      });
    });
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
    client.on('join', function(name) {
      messsages.forEach(function(message) {
        client.emit('messages', message.name + ': ' + message.data);
      });
    });
    client.set('nickname', name);
    client.broadcast.emit('chat', name + " joined the chat");
  });
  client.on('messages', function(message) {
    client.get('nickname', function(error, name) {
      client.broadcast.emit('messages', name + ': ' + message);
      client.emit('messages', name + ': ' + message);
      storeMessage(name, message);
    });
  });
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
server.listen(8080);
