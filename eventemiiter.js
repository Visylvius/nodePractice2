var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();
logger.on('error', function(message){
  console.log('ERR: + message');
});
logger.emit('error', 'Spilled Milk');
logger.emit('error', 'Eggs Cracked');

// http.createServer([requestListener])
//   returns a new web server object
//   the requestListener is a function which is automaticcaly added to the 'request' event.

  // Class: http.server
  //   this is an EventEmitter with the following events:
  //     Event: 'Request'
  //       Function(request, response) {
  //         Emitted each time there is a request.
  //       }

  http.createServer(function(request, response){

  });
  //same as
  var server = http.createServer();
  server.on('request', function(request, response){

  });
