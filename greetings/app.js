var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
var express = require('express');
var request = require('request');
var url = require('url');
// command line
//npm install --save express === installs module and adds to package.json
var app = express();
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.listen(8080);
// grabs 10 tweets and displays them back on UI
app.get('/tweets/:username', function(req, response) {
  var username = req.params.username;
  options = {
    protocol: "http:",
    host: "api.twitter.com",
    pathname: "/1/statuses/user_timeline.json",
    query: {screen_name: username, count: 10}
  };
  var twitterUrl = url.format(options);
  request(twitterUrl).pipe(response);
});







hello();
//reference custom goodbye for syntax
gb.goodbye();
//if you only need to call it once
require('./custom_goodbye').goodbye();

// my_module.js
var myMod = require('./my_module');
myMod.foo();
myMod.bar();

// reference make_request.js
var makeRequest = require('./make_request');

makeRequest("here's looking at you, kid");
makeRequest('Hello, this is dog');
//semantic versioning
//example: 1.8.7 1 = a major change, 8 = a minor change, 7 = a patch
//ranges
//'connect': '~1' === >=1.0.0 < 2.0.0 <== dangerous
//'connect': '~1.8' === >=1.8.0 < 1.9.0 <== api could change
//'connect': '1.8.7' === >=1.8.7 < 1.9.0
