/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov.js');

let source = process.argv[3];

function makeText(source) {
	fs.readFile(source, 'utf8', function(err, data) {
		if (err) {
			console.error(`Error: Can't read file ${source}: ${err}`);
			process.exit(1);
		} else {
			let mm = new MarkovMachine(data);
			console.log(mm.makeText());
		}
	});
}

async function makeWebText(url) {
	try {
		let res = await axios.get(url);
		let mm = new MarkovMachine(res.data);
		console.log(mm.makeText());
	} catch (err) {
		console.error(`Error: Can't read URL ${url}: ${err}`);
		process.exit(1);
	}
}

if (process.argv[2] === 'file') {
	makeText(source);
}
if (process.argv[2] === 'url') {
	makeWebText(source);
}
