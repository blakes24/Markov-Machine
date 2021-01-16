const { MarkovMachine } = require('./markov.js');

describe('MarkovMachine constructor', function() {
	test('constructor should create an array of words', function() {
		const res = new MarkovMachine('the cat in the hat');
		expect(res.words).toEqual(expect.any(Array));
	});

	test('constructor should create chains', function() {
		const res = new MarkovMachine('the cat in the hat');
		expect(res.chains).toEqual(expect.any(Object));
	});
});

describe('MarkovMachine makeText', function() {
	let markov;
	beforeEach(function() {
		markov = new MarkovMachine(
			'I do not like them, Sam-I-am. I do not like Green eggs and ham. Would you like them Here or there? I would not like them Here or there. I would not like them anywhere.'
		);
	});
	test('makeText should create a string', function() {
		expect(markov.makeText()).toEqual(expect.any(String));
	});

	test('set max number of words', function() {
		let str = markov.makeText(4);
		expect(str.split(' ').length).toBeLessThanOrEqual(4);
	});

	test('text should start with a capital letter', function() {
		let str = markov.makeText();
		expect(str.charAt(0).match(/[A-Z]/)).toBeTruthy();
	});

	test('text should end with a period', function() {
		let str = markov.makeText();
		expect(str.endsWith('.')).toBeTruthy();
	});
});
