/*
	just support english search
*/

var cheerio = require('cheerio');
var https = require('https');

const options = {
	hostname: 'www.bing.com',
	port: 443,
	path: '/search?q=',
	method: 'GET'
};

process.on('message', (keyword) => {
	options.path += keyword;
	getContent(options);
});


function getContent() {
	const req = https.request(options, function(res) {
		res.setEncoding('utf8');
		var html = [];
		var size = 0;
		res.on('data', function(d) {
			html.push(d);
			size += html.length;
		});

		res.on('end', ()=> {

			// console.log(html + '');
			html =  html + '';
			var $ = cheerio.load(html);

			var link = $('#b_results').children('li').first().find('a').attr('href');
			var content = $('#b_results').children('li').first().find('a').text();
			// console.log($('#b_results').children('li').first().find('a').attr());
			// console.log($('#b_results').children('li').first().find('a').text());

			var bingData = [link, content];
			// console.log(bingData);
			process.send(bingData);
			process.exit(0);
		});

		res.on('error', (e) => {
			console.error(e);
		});
	});

	req.end();
}

