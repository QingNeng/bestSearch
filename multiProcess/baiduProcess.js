var cheerio = require('cheerio');
var https = require('https');
// var baidu = 'https://www.baidu.com/s?ie=UTF-8&wd=';
// https://www.baidu.com/s?ie=UTF-8&wd=hello

const options = {
	hostname: 'www.baidu.com',
	port: 443,
	path: '/s?ie=UTF-8&wd=hello',
	method: 'GET'
};


getContent();
function getContent() {
	const req = https.request('https://www.baidu.com/s?ie=UTF-8&wd=hello', function(res) {
		var html = '';
		// var count = 0;
		res.on('data', function(d) {
			html += d.toString();
			// count++;
		});

		res.on('end', ()=> {
			var $ = cheerio.load(html);
			console.log(html)

		});

		res.on('error', (e) => {
			console.error(e);
		});

	});

	req.end();
}