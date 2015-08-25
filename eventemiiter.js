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

  http.createServer(function(request, response){
    response.writeHead(200);
    var chunk = null;
    while (null !== (chunk = request.read())) {
      response.write(chunk);
    }
  });
  request.on('end', function(){
    response.end();
  })
}).listen(8080);
// or you can do this
http.createServer(function(request, response){
  response.writeHead(200);
  request.pipe(response);
})

var fs = require('fs');
var file = fs.createReadStream('readme.md');
var newFile = fs.createWriteSteam('readme_copy.md');
file.pipe(newFile);

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  var newFile = fs.createWriteSteam('readme_copy.md');
  request.pipe(newFile);
  request.on('end', function(){
    response.end('uploaded!');
  });
}).listen(8080);
// curl --upload-file read.me http://localhost:8080

http.createServer(function(request, response) {
  var newFile = fs.createWriteSteam('readme_copy.md');
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  request.on('readable', function() {
    var chunk = null;
    while (null !== (chunk = request.read())) {
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes / filesBytes) * 100;
      response.write('progress:' + parseInt(progress, 10) + '%\n');
    }
  });
  request.pipe(newFile);
}).listen(8080);

// end of section 3
