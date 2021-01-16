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
	test('makeText should create a string', function() {
		const res = new MarkovMachine('the cat in the hat');
		expect(res.makeText()).toEqual(expect.any(String));
	});

	test('set max number of words', function() {
		const res = new MarkovMachine('the cat in the hat');
		let str = res.makeText(4);
		expect(str.split(' ').length).toBeLessThanOrEqual(4);
	});
});
