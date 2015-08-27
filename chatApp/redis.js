//npm install redis --save

var redis = require('redis');
var client = redis.createClient();

client.set('message1', 'hello, yes this is dog');
client.set('message2', 'hello, no this is spider');
client.get('message1', function(err, reply) {
  console.log(reply);
});

//redis lists: pushing
  var message = 'hello, this is dog';
  client.lpush('messages', message, function(err, reply) {
    //trim keeps first two strings and removes the rest
    client.ltrim('messages', 0, 1);
    console.log(reply);
  });
  //retrieves the list
  client.lrange('messages' 0, -1, function(err, messages) {
    console.log(messages);
  })
  var message = 'hello, no this is spider';
  client.lpush('messages', message, function(err, reply) {
    console.log(reply);
  });
client.sadd('names', 'Dog');
client.sadd('names', 'Spider');
client.sadd('names', 'Gregg');
client.srem('names', 'Spider');

client.smembers('names', function(err, names) {
  console.log(names);
});
