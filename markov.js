/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let chains = {};

		for (let i = 0; i < this.words.length; i++) {
			// create a bigram with current word and next word
			let bigram = this.words[i] + ' ' + this.words[i + 1];
			let nextWord = this.words[i + 2] || null;

			// set bigram as key and value as array of following words
			if (chains[bigram]) {
				chains[bigram].push(nextWord);
			} else {
				chains[bigram] = [ nextWord ];
			}

			if (nextWord === null) {
				break;
			}
		}
		this.chains = chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// get keys that start with a capital letter
		let keys = Object.keys(this.chains).filter((key) => key.match(/^[A-Z]/));
		// if no keys start with a capital use all keys
		if (keys.length === 0) {
			keys = Object.keys(this.chains);
		}
		// get a random key
		let bigram = keys[Math.floor(Math.random() * keys.length)];
		let text = [ bigram ];
		let next = bigram;

		while (text.length < numWords - 1 && next != null) {
			//get random word from array for current bigram
			next = this.chains[bigram][Math.floor(Math.random() * this.chains[bigram].length)];
			//add word to text array
			text.push(next);
			//split bigram and make next bigram with last word and next word
			let words = bigram.split(/[ \r\n]+/);
			bigram = words[1] + ' ' + next;
		}
		// make string from text array and remove anything after last period
		let str = text.join(' ');
		let index = str.lastIndexOf('.') + 1 || str.length + 1;
		return str.slice(0, index);
	}
}

module.exports = { MarkovMachine };
