var http = require('http');
var router = require('../router/router.js');

var server = http.createServer();
server.on('request', function(req, res) {
	router(req, res);
});
server.listen(3000, () => {
	console.log('listening the port 3000');
});
