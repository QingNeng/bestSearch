/*
	some problem: cann't get the first item on some case
*/

var https = require('https');
var cheerio = require('cheerio');
const options = {
	hostname: 'www.sogou.com',
	port: 443,
	path: '/web?query=',
	method: 'GET'
};

process.on('message', (keyword) => {
	options.path += keyword,
	// console.log(options.path);
	getContent(options);
});


// test
// getContent();


function getContent() {
	const req = https.request(options, function(res) {
		var html = '';
		// var count = 0;
		res.on('data', function(d) {
			html += d.toString();
			// count++;
		});

		res.on('end', ()=> {
			// console.log('end', 'count is:', count);

			/*------extract data---------*/
			var $ = cheerio.load(html);
			var link = '';
			var content = '';

			// first case
			var contentExists = $(`a`, '.vrwrap').eq(0).text();
			var linkExists	  = $('a', '.results').attr('href');
			// $('a', '.results').text() will all content
			// console.log($('a', '.results').text());

			if (contentExists && linkExists) {
				content = contentExists;
				link    = linkExists;
			} else {
				// two case
				link    = $('.results').children('div[class="vrwrap"]').children('h3').children('a').eq(1).attr('href');
				content = $('.results').children('div[class="vrwrap"]').children('h3').children('a').eq(1).text();
			}
			// console.log(content, link);
			// console.log($('.results').children('div[class="vrwrap"]').children('h3').eq(3).html());
			// console.log($('.results').children('div[class="vrwrap"]').children('h3').children('a').text());
			// console.log($('.results').children('div[class="vrwrap"]').children('h3').children('a').eq(1).text());
			// console.log($('.results').children('div[class="vrwrap"]').children('h3').children('a').last().text());

			/*------------send to master----------------*/
			link = decodeURIComponent(link);
			var sougouData = [link, content];
			process.send(sougouData);
			process.exit(0);

		});

		res.on('error', (e) => {
			console.error(e);
		});
	});

	req.end();
}
