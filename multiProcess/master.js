exports = module.exports = function (keyword, res) {
	var cp = require('child_process');
	var allData = [];

	// var baiduProcess = cp.fork(__dirname + '/baiduProcess.js');
	var bingProcess  = cp.fork(__dirname + '/bingProcess.js');
	var sogouProcess = cp.fork(__dirname + '/sogouProcess.js');

// send keyword to children process
	// console.log('keyword:', keyword);
	bingProcess.send(keyword);
	sogouProcess.send(keyword);

	function getSogouData() {
		return new Promise((resolve, reject) => {
			sogouProcess.on('message', function(m) {
				resolve(m);
			});
		});
	};

	function getBingData() {
		return new Promise((resolve, reject) => {
			bingProcess.on('message', function(m) {
				resolve(m);
			});
		});
	}


	async function getChildProData() {
		await getBingData().then((m) => allData.push(m));
		await getSogouData().then((m) => allData.push(m));

		// test
		// console.log(allData);
		res.writeHead(200, {'Content-Type': 'text/html'});
		var html = `<!DOCTYPE html>
									<html lang="en">
									<head>
										<meta charset="UTF-8">
										<title>bestSearch</title>
										<style type="text/css">
											a {
												text-decoration: none;
												color: #0000CC;
											}
										</style>
									</head>
									<body style="margin-left: 30%;">
										<p style="margin-left: 3%;"><a href=${allData[0][0]}>${allData[0][1]}  &emsp;&emsp;---bing</a></p>
										<p style="margin-left: 3%;"><a href=${allData[1][0]}>${allData[1][1]}  &emsp;&emsp;---sogou</a></p>
									</body>
									</html>`;

		// res.end(allData + '');
		res.end(html);
	}

	getChildProData();

} 
