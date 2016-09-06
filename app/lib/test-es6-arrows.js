module.exports = (() => {

	// Example from: https://babeljs.io/docs/learn-es2015/

	const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
	var fives = [];

	// Expression bodies
	var odds = evens.map(v => v + 1);
	var nums = evens.map((v, i) => v + i);

	// Statement bodies
	nums.forEach(v => {
		if (v % 5 === 0)
			fives.push(v);
	});

	// Lexical this
	var bob = {
		_name: "Bob",
		_friends: ["Sally", "Fred", "Brad"],
		printFriends() {
			this._friends.forEach(f =>
				console.log("[test-es6-arrows] " + this._name + " knows " + f));
		}
	};

	bob.printFriends();

})();