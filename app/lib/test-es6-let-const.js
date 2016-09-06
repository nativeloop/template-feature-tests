module.exports = (() => {

	// Example from: https://babeljs.io/docs/learn-es2015/

	function f() {
		{
			let x; {
				// okay, block scoped name
				const x = "sneaky";
				// error, const
				// x = "foo";
			}
			// okay, declared with `let`
			x = "bar";
			// error, already declared in block
			// let x = "inner";
		}
	}

})();