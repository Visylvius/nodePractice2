var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
hello();

// my_module.js
var myMod = require('./my_module');
myMod.foo();
myMod.bar();
//reference custom goodbye for syntax
gb.goodbye();
//if you only need to call it once
require('./custom_goodbye').goodbye();
var http = require('http');

var message = "here's looking at you, kid";
var options = {
  host: 'localhost', port: 8080, path: '/', method: 'POST'
};

var request = http.request(options, function(response) {
  response.on('data', function(data) {
    console.log(data);
  });
});
request.write(message);
request.end();
