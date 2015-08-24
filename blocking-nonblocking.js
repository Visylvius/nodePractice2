//blocking code
var contents = fs.readFileSync('/etc/hosts');
console.log(contents);
console.log('doing something else');

//non-blocking code
fs.readFile('/etc/hosts', function(err, contents) {
  console.log(contents);
});
console.log('doing something else');

//same as
var callback = function(err, contents) {
  console.log(contents);
};
fs.readFile('/etc/hosts', callback);
fs.readFile('/etc/inetcfg', callback);
