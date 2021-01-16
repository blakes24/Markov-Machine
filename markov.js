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
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			if (chains[word]) {
				chains[word].push(nextWord);
			} else {
				chains[word] = [ nextWord ];
			}
		}
		this.chains = chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let keys = Object.keys(this.chains).filter((word) => word.match(/[A-Z]/));

		if (keys.length === 0) {
			keys = Object.keys(this.chains);
		}
		let word = keys[Math.floor(Math.random() * keys.length)];
		let text = [ word ];
		let next = word;

		while (text.length < numWords && next != null) {
			next = this.chains[word][Math.floor(Math.random() * this.chains[word].length)];
			text.push(next);
			word = next;
		}
		let str = text.join(' ');
		let index = str.lastIndexOf('.') + 1 || str.length + 1;
		return str.slice(0, index);
	}
}

module.exports = { MarkovMachine };
