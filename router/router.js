var fs     = require('fs');
var http   = require('http');
var cp     = require('child_process');
var master = require('../multiProcess/master.js');

//-------------------------------
// console.log(typeof master);
// console.log(master);
//--------------------------------


var fileBuf = Buffer.from(fs.readFileSync('../view/index.html'));
var cssFile = Buffer.from(fs.readFileSync('../view/index.css'));
exports = module.exports = router;

/* --------------router-start------------------*/
function router(req, res) {
	var data = '';
	var keyword = '';
	var reqUrl = req.url
	var returnDataToUser = '';

	switch (reqUrl) {
		case '/':
			res.writeHead(200, {"Content-type": "text/html"});
			res.end(fileBuf);
			break;
		
		// css file	
		case '/index.css':
			res.writeHead(200, {"Content-type": "text/css"});
			res.end(cssFile);
			break;


		case '/search':
			// getContent
			res.writeHead(200, {"Content-type": "text/html"});
			// var a = jsonStr = getContent();
			req.on('data', (d) => {
				data += d
			});

			req.on('end', () => {
				// console.log(data);
				keyword = decodeURIComponent(data).split('=')[1];

				// console.log(keyword);
				// console.log(typeof res)
				master(keyword, res);
			});

			break;

		default:
			notFound(res);
	}
}

function notFound(res) {
	res.stautsCode = 404;
	res.setHeader('Content-Type', 'text/pain');
	res.end("Not Found");
}
/*-----------------router-end---------------*/

/*
function getChildProData() {
	return new Promise(() {
		returnDataToUser = master(keyword);
	});
}*/

