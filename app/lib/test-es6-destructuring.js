module.exports = (() => {

	// Example from: https://gist.github.com/mikaelbr/9900818

	// === Arrays

	var [a, b] = [1, 2];
	console.log("[test-destructuring] " + a, b);
	//=> 1 2


	// Use from functions, only select from pattern
	var foo = () => {
		return [1, 2, 3];
	};

	var [a, b] = foo();
	console.log("[test-destructuring] " + a, b);
	// => 1 2


	// Omit certain values
	var [a, , b] = [1, 2, 3];
	console.log("[test-destructuring] " + a, b);
	// => 1 3


	// Combine with spread/rest operator (accumulates the rest of the values)
	var [a, ...b] = [1, 2, 3];
	console.log("[test-destructuring] " + a, b);
	// => 1 [ 2, 3 ]


	// Fail-safe.
	var [, , , a, b] = [1, 2, 3];
	console.log("[test-destructuring] " + a, b);
	// => undefined undefined


	// Swap variables easily without temp
	var a = 1,
		b = 2;
	[b, a] = [a, b];
	console.log("[test-destructuring] " + a, b);
	// => 2 1


	// Advance deep arrays
	var [a, [b, [c, d]]] = [1, [2, [
		[
			[3, 4], 5
		], 6
	]]];
	console.log("[test-destructuring] " + "a:", a, "b:", b, "c:", c, "d:", d);
	// => a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6


	// === Objects

	var {
		user: x
	} = {
		user: 5
	};
	console.log("[test-destructuring] " + x);
	// => 5


	// Fail-safe
	var {
		user: x
	} = {
		user2: 5
	};
	console.log("[test-destructuring] " + x);
	// => undefined


	// More values
	var {
		prop: x,
		prop2: y
	} = {
		prop: 5,
		prop2: 10
	};
	console.log("[test-destructuring] " + x, y);
	// => 5 10

	// Short-hand syntax
	var {
		prop,
		prop2
	} = {
		prop: 5,
		prop2: 10
	};
	console.log("[test-destructuring] " + prop, prop2);
	// => 5 10

	// Equal to:
	var {
		prop: prop,
		prop2: prop2
	} = {
		prop: 5,
		prop2: 10
	};
	console.log("[test-destructuring] " + prop, prop2);
	// => 5 10

	// Oops: This doesn't work:
	/*
	var a, b; {
		a,
		b
	} = {
		a: 1,
		b: 2
	};
	*/

	// But this does work
	var a, b;
	({
		a,
		b
	} = {
		a: 1,
		b: 2
	});
	console.log("[test-destructuring] " + a, b);
	// => 1 2

	// This due to the grammar in JS. 
	// Starting with { implies a block scope, not an object literal. 
	// () converts to an expression.

	// From Harmony Wiki:
	// Note that object literals cannot appear in
	// statement positions, so a plain object
	// destructuring assignment statement
	//  { x } = y must be parenthesized either
	// as ({ x } = y) or ({ x }) = y.




	// Combine objects and arrays
	var {
		prop: x,
		prop2: [, y]
	} = {
		prop: 5,
		prop2: [10, 100]
	};
	console.log("[test-destructuring] " + x, y);
	// => 5 100


	// Deep objects
	var {
		prop: x,
		prop2: {
			prop2: {
				nested: [, , b]
			}
		}
	} = {
		prop: "Hello",
		prop2: {
			prop2: {
				nested: ["a", "b", "c"]
			}
		}
	};
	console.log("[test-destructuring] " + x, b);
	// => Hello c


	// === Combining all to make fun happen

	// All well and good, can we do more? Yes!
	// Using as method parameters
	var foo = function({
		prop: x
	}) {
		console.log("[test-destructuring] " + x);
	};

	foo({
		invalid: 1
	});
	foo({
		prop: 1
	});
	// => undefined
	// => 1


	// Can also use with the advanced example
	var foo = function({
		prop: x,
		prop2: {
			prop2: {
				nested: b
			}
		}
	}) {
		console.log("[test-destructuring] " + x, ...b);
	};
	foo({
		prop: "Hello",
		prop2: {
			prop2: {
				nested: ["a", "b", "c"]
			}
		}
	});
	// => Hello a b c


	// In combination with other ES2015 features.

	// Computed property names
	const name = 'fieldName';
	const computedObject = {
		[name]: name
	}; // (where object is { 'fieldName': 'fieldName' })
	const {
		[name]: nameValue
	} = computedObject;
	console.log("[test-destructuring] " + nameValue)
		// => fieldName



	// Rest and defaults
	var ajax = function({
		url = "localhost",
		port: p = 80
	}, ...data) {
		console.log("[test-destructuring] " + "Url:", url, "Port:", p, "Rest:", data);
	};

	ajax({
		url: "someHost"
	}, "additional", "data", "hello");
	// => Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]

	ajax({}, "additional", "data", "hello");
	// => Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]


	// Ooops: Doesn't work (in traceur)
	/*
	var ajax = ({
		url = "localhost",
		port: p = 80
	}, ...data) => {
		console.log("Url:", url, "Port:", p, "Rest:", data);
	};
	ajax({}, "additional", "data", "hello");
	*/
	// probably due to traceur compiler

	// But this does:
	var ajax = ({
		url: url = "localhost",
		port: p = 80
	}, ...data) => {
		console.log("[test-destructuring] " + "Url:", url, "Port:", p, "Rest:", data);
	};
	ajax({}, "additional", "data", "hello");


	// Like _.pluck
	var users = [{
		user: "Name1"
	}, {
		user: "Name2"
	}, {
		user: "Name2"
	}, {
		user: "Name3"
	}];
	var names = users.map(({
		user
	}) => user);
	console.log("[test-destructuring] " + names);
	// => [ 'Name1', 'Name2', 'Name2', 'Name3' ]


	// Advanced usage with Array Comprehension and default values
	var users = [{
		user: "Name1"
	}, {
		user: "Name2",
		age: 2
	}, {
		user: "Name2"
	}, {
		user: "Name3",
		age: 4
	}];
	/*
		[
			for ({
					user,
					age = "DEFAULT AGE"
				}
				of users) console.log(user, age)
		];
		// => Name1 DEFAULT AGE
		// => Name2 2
		// => Name2 DEFAULT AGE
		// => Name3 4
	*/

})();