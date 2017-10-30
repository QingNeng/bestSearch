var http = require('http');
var router = require('../router/router.js');

exports = module.exports = start;

function start() {
  var server = http.createServer();
  server.on('request', function(req, res) {
    router(req, res);
  });
  server.listen(3000, () => {
    console.log('listening the port 3000');
  });
}

// start();
